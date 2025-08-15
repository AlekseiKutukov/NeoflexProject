import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://alekseikutukov.github.io/NeoflexProject/
export default defineConfig({
  plugins: [react()],
  base: "/NeoflexProject/",
  server: {
    proxy: {
      "/application": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
      "/admin": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
