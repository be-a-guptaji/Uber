import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load and configuring environment variables
dotenv.config();

// Create an express app
const app = express();

// Enable CORS
app.use(
  cors({
    // This is a security risk. Do not use this in production.
    // This is only for development purposes.
    origin: process.env.CORS_ORIGIN!,
    credentials: true,
  })
);

export default app;
