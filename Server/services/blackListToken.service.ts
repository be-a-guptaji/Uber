import BlacklistToken from "../models/blackListToken.model";
import { ApiError } from "../utils/api/ApiError";

// Add a token to the blacklist
export const addTokenToBlackList = async (token: string): Promise<void> => {
  try {
    // Create a new blacklist token in the database
    await BlacklistToken.create({ token });
  } catch (error: unknown) {
    // Ensure error is of type Error or handle it if it's something else
    let errorMessages: string[];

    // If error is an instance of Error, extract the message
    if (error instanceof Error) {
      errorMessages = [error.message];
    } else {
      // If error is not an instance of Error, convert it to a string
      errorMessages = [
        "Something went wrong at database connection. At ./services/user.service.ts file",
      ];
    }

    // Throw a custom API error with the error messages
    throw new ApiError(500, "Error finding user.", errorMessages);
  }
};

// Check if a token is blacklisted
export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
  // Check if the token is blacklisted in the database
  try {
    // Check if the token is blacklisted in the database
    const blacklistedToken = await BlacklistToken.findOne({ token });

    // Return true if the token is blacklisted, false otherwise
    return !!blacklistedToken;
  } catch (error: unknown) {
    // Ensure error is of type Error or handle it if it's something else
    let errorMessages: string[];

    // If error is an instance of Error, extract the message
    if (error instanceof Error) {
      errorMessages = [error.message];
    } else {
      // If error is not an instance of Error, convert it to a string
      errorMessages = [
        "Something went wrong at database connection. At ./services/user.service.ts file",
      ];
    }

    // Throw a custom API error with the error messages
    throw new ApiError(500, "Error finding user.", errorMessages);
  }
};
