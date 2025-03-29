declare global {
  // Extend the NodeJS namespace to include the env variables in TypeScript integration
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      CLIENT_URL: string;
      MONGO_URL: string;
      DB_NAME: string;
      JWT_SECRET_KEY: string;
      NODE_ENV: string;
      JWT_EXPIRY: string;
      EMAIL_ID: string;
      EMAIL_PASSWORD: string;
    }
  }
}

// Ensure the file is treated as a module by TypeScript.
export {};
