import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
const manifestForPlugin = {
  registerType: "prompt",
  includeAssets: [
    "logo.png"
  ],
  manifest: {
    name: "College Complaint Web App",
    short_name: "Complaint App",
    description: "Application to register complaint ",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      }
    ],
    theme_color: "#212121",
    background_color: "#D7FFFE",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
  devOptions: {
    enabled: true,
  },
};
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
