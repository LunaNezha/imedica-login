/// <reference types="vitest" />

import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [react(), legacy()],
  resolve: {
    alias: {
      "@public": path.resolve(__dirname, "./public"),
      "@src": path.resolve(__dirname, "./src/"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  define: {
    "process.env": {},
    __APP_VERSION__: JSON.stringify(require("./package.json").version),
  },
});
