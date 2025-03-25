import mongoose from "mongoose";
import { ApiError } from "../utils/api/ApiError";

// Define the function to connect to the database
export async function connectToDatabase(): Promise<void> {
  // Ensure environment variables are defined
  const mongoUrl = process.env.MONGO_URL!;
  const dbName = process.env.DB_NAME!;

  // Validate the environment variables
  if (!mongoUrl || !dbName) {
    throw new ApiError(500, "Missing required environment variables.", [
      "Environment variables are not defined. At ./database/database.ts file",
    ]);
  }

  try {
    // Connect to the MongoDB database
    await mongoose.connect(`${mongoUrl}${dbName}`);
    console.log("Connected to MongoDB Successfully");
  } catch (error: unknown) {
    // Ensure error is of type Error or handle it if it's something else
    let errorMessages: string[];

    // If error is an instance of Error, extract the message
    if (error instanceof Error) {
      errorMessages = [error.message];
    } else {
      // If error is not an instance of Error, convert it to a string
      errorMessages = [
        "Something went wrong at database connection. At ./database/database.ts file",
      ];
    }

    // Throw a custom API error with the error messages
    throw new ApiError(500, "Database error.", errorMessages);
  }
}
