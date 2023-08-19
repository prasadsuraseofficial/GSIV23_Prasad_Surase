import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import Manifest from "./public/manifest.json";

// https://vitejs.dev/config/
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
    // VitePWA({
    //   registerType: "prompt",

    //   // cache all the imports
    //   workbox: {
    //     globPatterns: ["**/*"],
    //   },

    //   // cache all the static assets in the public folder
    //   includeAssets: ["**/*"],

    //   manifest: {
    //     theme_color: "#F25C00",
    //     background_color: "#4A4A4A",
    //     display: "standalone",
    //     scope: "/",
    //     start_url: "/",
    //     orientation: "portrait",
    //     name: "Movie Browser",
    //     short_name: "Movie Browser",
    //     description: "Movie Browser App By Prasad S. For Interview!",
    //     icons: [
    //       {
    //         src: "/icon-192x192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/icon-256x256.png",
    //         sizes: "256x256",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/icon-384x384.png",
    //         sizes: "384x384",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/icon-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //         purpose: "any maskable",
    //       },
    //     ],
    //   },
    // }),
  ],
});
