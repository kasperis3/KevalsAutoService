# Google Reviews Integration Guide

This guide will help you connect your actual Google Business reviews to the website using the Google Places API.

## ✅ Current Setup: Google Places API (Dynamic)

The website is now configured to fetch reviews dynamically from Google Places API!

### Setup Steps:

1. **Get Your Google Places API Key:**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the **"Places API"**:
     - Go to "APIs & Services" → "Library"
     - Search for "Places API"
     - Click "Enable"
   - Create an API Key:
     - Go to "APIs & Services" → "Credentials"
     - Click "Create Credentials" → "API Key"
     - Copy your API key
   - (Optional) Restrict the API key to "Places API" for security

2. **Add API Key to Your Project:**

   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and add your API key:
     ```
     VITE_GOOGLE_PLACES_API_KEY=your_actual_api_key_here
     ```

3. **Restart Your Dev Server:**

   ```bash
   npm run dev
   ```

4. **Verify Your Place ID:**
   - Your Place ID is already set: `ChIJ6zMMYryYj4ARH0OQ_z4BO8I`
   - To change it, edit `src/components/Reviews.jsx` and update the `googlePlaceId` variable

### How It Works:

- ✅ Automatically fetches up to 6 most recent reviews
- ✅ Shows real customer names and photos
- ✅ Displays actual review text and ratings
- ✅ Updates automatically when new reviews are added
- ✅ Links to your full Google Business Profile

### API Costs:

- Google Places API has a **free tier**: $200/month credit
- Place Details API calls cost ~$0.017 per request
- With free tier, you get ~11,000 requests/month free
- After that, it's very affordable for a small business

---

## Alternative Options (If you prefer not to use API):

## Option 1: Manual Review Entry (Easiest)

1. Go to your Google Business Profile
2. Copy your best reviews
3. Open `src/components/Reviews.jsx`
4. Replace the sample reviews in the `reviews` array with your actual reviews:

```jsx
const reviews = [
  {
    id: 1,
    author: "Customer Name",
    rating: 5,
    date: "2 weeks ago",
    text: "Your actual review text here...",
    avatar: "👤",
  },
  // Add more reviews...
];
```

## Option 2: Google Reviews Widget (Recommended)

### Using a Third-Party Widget Service

**Elfsight Google Reviews Widget** (Free tier available):

1. Go to [elfsight.com](https://elfsight.com/google-reviews-widget/)
2. Sign up for free
3. Connect your Google Business Profile
4. Customize the widget
5. Get the embed code
6. Replace the Reviews component content with the widget embed

**ReviewsOnMyWebsite** (Free):

1. Go to [reviewsonmywebsite.com](https://reviewsonmywebsite.com/)
2. Connect your Google Business
3. Get embed code
4. Add to your Reviews component

## Option 3: Google Places API (Advanced)

If you want to automatically fetch reviews:

1. Get your Google Place ID:

   - Go to [Google Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
   - Search for your business
   - Copy the Place ID

2. Get Google Places API Key:

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a project
   - Enable "Places API"
   - Create an API key

3. Update `src/components/Reviews.jsx`:
   - Replace `YOUR_PLACE_ID_HERE` with your actual Place ID
   - Add API key to fetch reviews dynamically

**Note:** Google Places API has usage limits and may require billing for high traffic.

## Option 4: Google Business Profile Embed

Google doesn't provide a direct embed anymore, but you can:

1. Get your Google Business Profile URL
2. Update the "Read More Reviews on Google" button link in `Reviews.jsx`
3. The button will take visitors to your full Google reviews page

## Quick Setup Steps

1. **Find your Google Place ID:**

   - Visit: https://developers.google.com/maps/documentation/places/web-service/place-id
   - Search for your business name
   - Copy the Place ID

2. **Update Reviews.jsx:**

   - Open `src/components/Reviews.jsx`
   - Replace `YOUR_PLACE_ID_HERE` with your Place ID
   - Update the reviews array with your actual reviews (or use a widget)

3. **Update Google Maps Link:**
   - The "Read More Reviews" button will automatically link to your Google Business Profile

## Current Implementation

The Reviews component currently:

- ✅ Displays 3 sample reviews (replace with your real ones)
- ✅ Shows star ratings
- ✅ Links to your Google Business Profile
- ✅ Responsive design matching your site theme
- ✅ Purple color scheme

## Need Help?

- Google Business Profile: https://business.google.com/
- Google Places API Docs: https://developers.google.com/maps/documentation/places/web-service
