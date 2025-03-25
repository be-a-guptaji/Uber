import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./database/database";
import { ApiError } from "./utils/api/ApiError";
import UserRoutes from "./routes/user.routes";
import CaptainRoutes from "./routes/captain.routes";

// Load and configuring environment variables
dotenv.config({
  // Specify the path to the .env file
  path: "./.env",
});

// Ensure environment variables are loaded
if (
  !process.env.MONGO_URL ||
  !process.env.DB_NAME ||
  !process.env.CORS_ORIGIN ||
  !process.env.PORT ||
  !process.env.JWT_SECRET_KEY ||
  !process.env.NODE_ENV
) {
  throw new ApiError(500, "Missing required environment variables.", [
    "Something went wrong at app.ts. At ./app.ts file",
  ]);
}

// Create an express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser());

// Enable CORS
app.use(
  cors({
    // This is a security risk. Do not use this in production.
    // This is only for development purposes.
    origin: process.env.CORS_ORIGIN!,
    credentials: true,
  })
);

// Configure routes
app.use("/users", UserRoutes); // Prefix for User routes
app.use("/captains", CaptainRoutes); // Prefix for Captain routes

// Connect to the database
connectToDatabase();

// Export the app
export default app;
