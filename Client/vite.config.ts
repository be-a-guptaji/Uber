import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default ({ mode }: { mode: string }) => {
  // Load environment variables based on the current mode (e.g., 'development', 'production')
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
      port: parseInt(env.VITE_PORT, 10) || 3000, // Use the VITE_PORT variable, defaulting to 3000 if not set
    },
    base: env.VITE_BASE_URL || "/", // Dynamically set base URL using environment variable
    define: {
      "process.env": env, // Pass the environment variables to the application code
    },
  });
};
