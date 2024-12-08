import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      open: env.VITE_APP_BASENAME,
      proxy: {
        [env.VITE_APP_API_BASENAME]: {
          target: env.VITE_APP_API,
          changeOrigin: true,
        },
      },
    },
  };
});
