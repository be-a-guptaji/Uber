import mongoose from "mongoose";
import { ApiError } from "../utils/api/ApiError";

// Define the function to connect to the database
export async function connectToDatabase(): Promise<void> {
  try {
    // Ensure environment variables are defined
    const mongoUrl = process.env.MONGO_URL;
    const dbName = process.env.DB_NAME;

    // Validate the environment variables
    if (!mongoUrl || !dbName) {
      throw new ApiError(500, "Missing required environment variables.");
    }

    // Connect to the MongoDB database
    await mongoose.connect(`${mongoUrl}/${dbName}`);
    console.log("Connected to MongoDB");
  } catch (error) {
    // Ensure the error is a string or convert it to a string
    const errorMessage = error instanceof Error ? error.message : String(error);

    // Handle any errors during user creation
    throw new ApiError(500, "Error creating user.", [errorMessage]);
  }
}
