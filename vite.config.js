import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import Manifest from "./public/manifest.json";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",

      // cache all the imports
      workbox: {
        globPatterns: ["**/*"],
      },

      // cache all the static assets in the public folder
      includeAssets: ["**/*"],

      manifest: Manifest,
    }),
  ],
});
