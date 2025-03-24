import mongoose from "mongoose";

// Define the function to connect to the database
export async function connectToDatabase(): Promise<void> {
  try {
    // Ensure environment variables are defined
    const mongoUrl = process.env.MONGO_URL;
    const dbName = process.env.DB_NAME;

    // Validate the environment variables
    if (!mongoUrl || !dbName) {
      throw new Error(
        "MONGO_URL and DB_NAME must be defined in the environment variables."
      );
    }

    // Connect to the MongoDB database
    await mongoose.connect(`${mongoUrl}/${dbName}`);
    console.log("Connected to MongoDB");
  } catch (error) {
    // Handle connection errors
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw the error for further handling if needed
  }
}
