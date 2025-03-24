import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDatabase } from "./database/database";
import { ApiError } from "./utils/api/ApiError";

// Load and configuring environment variables
dotenv.config();

// Ensure environment variables are loaded
if (
  !process.env.MONGO_URL ||
  !process.env.DB_NAME ||
  !process.env.CORS_ORIGIN ||
  !process.env.PORT ||
  !process.env.JWT_SECRET_KEY
) {
  throw new ApiError(500, "Missing required environment variables.");
}

// Create an express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to the database
connectToDatabase();

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
