// Netlify serverless function to proxy Google profile images
// This avoids CORS and rate limiting issues

exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Get the image URL from query parameters
  const imageUrl = event.queryStringParameters?.url;

  if (!imageUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "url parameter is required" }),
    };
  }

  try {
    // Decode the URL
    const decodedUrl = decodeURIComponent(imageUrl);

    // Fetch the image from Google
    const response = await fetch(decodedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible)",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get("content-type") || "image/jpeg";

    // Return the image with proper headers
    return {
      statusCode: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000", // Cache for 1 year
        "Access-Control-Allow-Origin": "*",
      },
      body: Buffer.from(imageBuffer).toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error("Error fetching Google image:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};

