import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/google-places": {
        target: "https://maps.googleapis.com/maps/api",
        changeOrigin: true,
        rewrite: (path, req) => {
          // Extract place_id from query params and construct Google API URL
          const url = new URL(req.url, "http://localhost");
          const placeId = url.searchParams.get("place_id");
          if (placeId) {
            // Get API key from environment (only in dev, never bundled)
            const apiKey = process.env.VITE_GOOGLE_PLACES_API_KEY;
            if (apiKey) {
              return `/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;
            }
          }
          return path.replace(/^\/api\/google-places/, "");
        },
      },
      // Proxy for Google images - handles any Google image domain
      "/api/google-images": {
        target: "https://lh3.googleusercontent.com",
        changeOrigin: true,
        rewrite: (path) => {
          // Extract the actual path from our proxied URL
          // Format: /api/google-images?url=ENCODED_URL
          const match = path.match(/^\/api\/google-images\?url=(.+)$/);
          if (match) {
            try {
              const decodedUrl = decodeURIComponent(match[1]);
              const url = new URL(decodedUrl);
              // Return just the pathname and search params
              return url.pathname + url.search;
            } catch (e) {
              return path.replace(/^\/api\/google-images/, "");
            }
          }
          return path.replace(/^\/api\/google-images/, "");
        },
        configure: (proxy, _options) => {
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            // Clean headers to avoid restrictions
            proxyReq.removeHeader("referer");
            proxyReq.setHeader("user-agent", "Mozilla/5.0 (compatible)");
          });
        },
      },
    },
  },
});
