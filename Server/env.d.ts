declare global {
  // Extend the NodeJS namespace to include the env variables in TypeScript integration
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      CORS_ORIGIN: string;
      MONGO_URL: string;
      DB_NAME: string;
      JWT_SECRET_KEY: string;
      NODE_ENV: string;
    }
  }
}

// Ensure the file is treated as a module by TypeScript.
export {};
