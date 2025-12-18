// Netlify serverless function to proxy Google Places API requests
// This keeps your API key secure on the server side

exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Get API key from environment variable
  // Note: Use GOOGLE_PLACES_API_KEY (without VITE_ prefix) in Netlify
  // VITE_ prefix is only for client-side variables, which we don't want here
  const apiKey = process.env.GOOGLE_PLACES_API_KEY || process.env.VITE_GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key not configured" }),
    };
  }

  // Get place_id from query parameters
  const placeId = event.queryStringParameters?.place_id;

  if (!placeId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "place_id parameter is required" }),
    };
  }

  try {
    // Call Google Places API
    const fields = "name,rating,reviews";
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();

    // Return the data with CORS headers
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // In production, restrict this to your domain
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error fetching Google Places data:", error);
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
