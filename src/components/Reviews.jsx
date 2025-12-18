import { useState, useEffect } from "react";
import "./Reviews.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [businessName, setBusinessName] = useState("");

  const googlePlaceId = "ChIJp7me7laZj4AR1Voz18Q5NYs";
  const isDevelopment = import.meta.env.DEV;
  const googleMapsUrl = `https://www.google.com/maps/place/?q=place_id:${googlePlaceId}`;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Always use Netlify function endpoint
        // In development, Vite proxy will forward to Google API
        // In production, Netlify Function handles it (API key is server-side)
        const apiUrl = `/api/google-places?place_id=${googlePlaceId}`;

        console.log("Fetching reviews from Google Places API...");
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.status === "OK" && data.result) {
          setBusinessName(data.result.name || "");
          console.log("Business name:", data.result.name);
          console.log("Number of reviews:", data.result.reviews?.length || 0);

          // Format reviews from Google API
          // Note: Google Places API only returns up to 5 reviews maximum
          if (data.result.reviews && data.result.reviews.length > 0) {
            const formattedReviews = data.result.reviews
              .slice(0, 5) // Show all available reviews (Google limits to 5 max)
              .map((review, index) => {
                // Proxy Google profile photos through our server to avoid CORS/429 errors
                let avatarUrl = review.profile_photo_url || "👤";
                if (
                  avatarUrl &&
                  typeof avatarUrl === "string" &&
                  avatarUrl.startsWith("http")
                ) {
                  // Encode the full URL and pass it as a query parameter to our proxy
                  try {
                    const encodedUrl = encodeURIComponent(avatarUrl);
                    avatarUrl = `/api/google-images?url=${encodedUrl}`;
                    console.log("Proxying image:", avatarUrl);
                  } catch (e) {
                    console.log("Failed to encode image URL, using emoji:", e);
                    // If encoding fails, use emoji
                    avatarUrl = "👤";
                  }
                }
                return {
                  id: review.author_name + index,
                  author: review.author_name,
                  rating: review.rating,
                  date: formatReviewDate(review.time),
                  text: review.text,
                  avatar: avatarUrl,
                  relativeTime: review.relative_time_description || "",
                };
              });

            console.log("Formatted reviews:", formattedReviews);
            setReviews(formattedReviews);
          } else {
            setError("No reviews found for this business");
          }
        } else {
          // Handle specific API errors
          if (data.status === "REQUEST_DENIED") {
            throw new Error(
              "API key is invalid or Places API is not enabled. Check your Google Cloud Console settings."
            );
          } else if (data.status === "INVALID_REQUEST") {
            throw new Error(
              "Invalid Place ID. Please check your Place ID is correct."
            );
          } else {
            throw new Error(data.error_message || `API Error: ${data.status}`);
          }
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(
          err.message || "Failed to load reviews. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [googlePlaceId]);

  const formatReviewDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffDays < 30)
      return `${Math.floor(diffDays / 7)} week${
        Math.floor(diffDays / 7) > 1 ? "s" : ""
      } ago`;
    if (diffDays < 365)
      return `${Math.floor(diffDays / 30)} month${
        Math.floor(diffDays / 30) > 1 ? "s" : ""
      } ago`;
    return `${Math.floor(diffDays / 365)} year${
      Math.floor(diffDays / 365) > 1 ? "s" : ""
    } ago`;
  };

  const renderStars = (rating) => {
    return "⭐".repeat(Math.floor(rating));
  };

  return (
    <section className="reviews section">
      <div className="container">
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-subtitle">
          Don't just take our word for it - see what our customers have to say
          about their experience
        </p>

        {reviews.length > 0 ? (
          <>
            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  renderStars={renderStars}
                  index={index}
                />
              ))}
            </div>

            <div className="reviews-cta">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="google-reviews-button"
              >
                Read More Reviews on Google
              </a>
            </div>
          </>
        ) : (
          <div className="reviews-empty">
            <p>No reviews available at this time.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// Separate component for review card with image error handling
function ReviewCard({ review, renderStars, index }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [shouldTryImage, setShouldTryImage] = useState(false);

  // Stagger image loading to avoid rate limiting (429 errors)
  // Load images one at a time with delays
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if avatar is a URL (either http/https or our proxied /api/google-images)
      const hasImageUrl =
        typeof review.avatar === "string" &&
        (review.avatar.startsWith("http") ||
          review.avatar.startsWith("/api/google-images"));
      setShouldTryImage(hasImageUrl);
    }, index * 200); // 200ms delay between each image load attempt

    return () => clearTimeout(timer);
  }, [review.avatar, index]);

  const showImage = shouldTryImage && !imageError;

  return (
    <div className="review-card">
      <div className="review-header">
        {showImage ? (
          <img
            src={review.avatar}
            alt={review.author}
            className="review-avatar-img"
            onError={(e) => {
              // Silently handle errors (429 rate limiting, CORS, etc.)
              console.log("Image failed to load, using fallback");
              setImageError(true);
              if (e.target) e.target.style.display = "none";
            }}
            onLoad={() => {
              console.log("Image loaded successfully");
              setImageLoaded(true);
            }}
            loading="lazy"
            style={{ display: imageLoaded && !imageError ? "block" : "none" }}
          />
        ) : null}
        <div
          className="review-avatar"
          style={{ display: showImage && imageLoaded ? "none" : "flex" }}
        >
          {review.avatar &&
          typeof review.avatar === "string" &&
          !review.avatar.startsWith("http") &&
          !review.avatar.startsWith("/api/google-images")
            ? review.avatar
            : "👤"}
        </div>
        <div className="review-author-info">
          <h3 className="review-author">{review.author}</h3>
          <div className="review-rating">{renderStars(review.rating)}</div>
        </div>
      </div>
      <p className="review-text">{review.text}</p>
      <span className="review-date">{review.relativeTime || review.date}</span>
    </div>
  );

  if (loading) {
    return (
      <section className="reviews section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it - see what our customers have to say
            about their experience
          </p>
          <div className="reviews-loading">
            <p>Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="reviews section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it - see what our customers have to say
            about their experience
          </p>
          <div className="reviews-error">
            <p>{error}</p>
            <p className="error-hint">
              Make sure you've added your Google Places API key to the .env file
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="reviews section">
      <div className="container">
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-subtitle">
          Don't just take our word for it - see what our customers have to say
          about their experience
        </p>

        {reviews.length > 0 ? (
          <>
            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  renderStars={renderStars}
                  index={index}
                />
              ))}
            </div>

            <div className="reviews-cta">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="google-reviews-button"
              >
                Read More Reviews on Google
              </a>
            </div>
          </>
        ) : (
          <div className="reviews-empty">
            <p>No reviews available at this time.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Reviews;
