import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    sourcemap: !!process.env.TAURI_DEBUG,
    target: ["es2021", "chrome100", "safari13"],
  },
  clearScreen: false,
  envPrefix: ["TAURI_", "VITE_"],
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: { strictPort: true },
});
