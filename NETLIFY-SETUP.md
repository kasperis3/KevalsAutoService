# Netlify Deployment Setup Guide

This guide will help you deploy your Keval Auto Service website to Netlify with secure Google Places API integration.

## Step 1: Prepare Your Code

Your code is already set up! The app will:

- Use Vite proxy in development (localhost)
- Use Netlify Functions in production (secure API key)

## Step 2: Build Your Site

Test the production build locally:

```bash
npm run build
```

This creates a `dist` folder with your production-ready site.

## Step 3: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard (Easiest)

1. **Go to [Netlify](https://www.netlify.com/)** and sign up/login
2. **Click "Add new site" → "Import an existing project"**
3. **Connect to Git** (GitHub, GitLab, or Bitbucket)
   - Select your repository
   - Netlify will detect your build settings automatically
4. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Add environment variable:**
   - Go to Site settings → Environment variables
   - Add: `GOOGLE_PLACES_API_KEY` = `your_actual_api_key_here`
   - **Important:** Use `GOOGLE_PLACES_API_KEY` (NOT `VITE_GOOGLE_PLACES_API_KEY`) to keep it server-side only
6. **Deploy!**

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI:**

   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**

   ```bash
   netlify login
   ```

3. **Initialize and deploy:**

   ```bash
   netlify init
   netlify deploy --prod
   ```

4. **Set environment variable:**
   ```bash
   netlify env:set GOOGLE_PLACES_API_KEY "your_actual_api_key_here"
   ```
   **Important:** Use `GOOGLE_PLACES_API_KEY` (NOT `VITE_GOOGLE_PLACES_API_KEY`) to keep it server-side only

## Step 4: Set Environment Variable

**Important:** You MUST set the `GOOGLE_PLACES_API_KEY` environment variable in Netlify:

1. Go to your site dashboard
2. Click **Site settings** → **Environment variables**
3. Click **Add variable**
4. Key: `GOOGLE_PLACES_API_KEY` (NOT `VITE_GOOGLE_PLACES_API_KEY` - this keeps it server-side only)
5. Value: Your Google Places API key
6. Click **Save**

**Why not VITE\_ prefix?** Variables with `VITE_` prefix get bundled into the client-side code, exposing your API key. Using `GOOGLE_PLACES_API_KEY` keeps it secure on the server.

## Step 5: Update CORS Settings (Optional but Recommended)

In production, you should restrict CORS to your domain. Edit `netlify/functions/google-places.js`:

```javascript
"Access-Control-Allow-Origin": "https://your-site-name.netlify.app",
```

Or use your custom domain if you have one.

## How It Works

### Development (localhost):

- Uses Vite proxy (`vite.config.js`)
- API key is in `.env` file
- Works immediately

### Production (Netlify):

- Uses Netlify Function (`netlify/functions/google-places.js`)
- API key is in Netlify environment variables (secure, server-side)
- No API key exposed to the browser

## Troubleshooting

### Reviews not loading?

1. Check that `GOOGLE_PLACES_API_KEY` is set in Netlify (NOT `VITE_GOOGLE_PLACES_API_KEY`)
2. Check Netlify Function logs: Site dashboard → Functions → View logs
3. Verify your API key is valid

### Build fails?

1. Make sure `npm run build` works locally first
2. Check Netlify build logs for errors
3. Ensure all dependencies are in `package.json`

### CORS errors?

- The Netlify function handles CORS automatically
- If you see CORS errors, check the function logs

## Security Notes

✅ **API key is secure:**

- Never committed to Git (in `.gitignore`)
- Stored in Netlify environment variables
- Only accessible server-side in Netlify Functions

✅ **Best practices:**

- Restrict CORS to your domain in production
- Use Netlify's environment variable encryption
- Regularly rotate your API keys

## Next Steps

1. Deploy to Netlify
2. Set the environment variable
3. Test your site
4. (Optional) Set up a custom domain

Your site will be live at `https://your-site-name.netlify.app`! 🚀
