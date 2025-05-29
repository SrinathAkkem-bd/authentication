import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "/",
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    headers: {
      'Cache-Control': 'no-store',
    },
  },
});