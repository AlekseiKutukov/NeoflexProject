// <reference types="vitest" /> ///
import { defineConfig } from "vitest/config";
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
      "/document": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    globals: true, // чтобы можно было использовать describe/it без импорта
    environment: "jsdom", // эмуляция браузера
    setupFiles: "./src/setupTests.ts", // файл для конфигурации
  },
});
