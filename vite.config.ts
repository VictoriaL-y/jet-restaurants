import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const apiUrl = loadEnv(mode, process.cwd(), "").VITE_API_BASE_URL;

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/discovery": {
          target: apiUrl,
          changeOrigin: true,
        },
      },
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/test/setup.ts",
    },
  };
});
