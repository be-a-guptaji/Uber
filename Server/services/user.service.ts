import User, { UserSchemaType } from "../models/user.model";
import { ApiError } from "../utils/api/ApiError";

// Define the user interface
type UserType = {
  fullName: {
    firstName: string;
    lastName?: string;
  };
  email: string;
  password: string;
};

// Create a new user
export const createUser = async ({
  fullName,
  email,
  password,
}: UserType): Promise<UserSchemaType> => {
  // Create a new user using the hashed password
  try {
    // Validate the user data
    if (!fullName.firstName || !email || !password) {
      // Throw an error if any required field is missing
      throw new ApiError(400, "Missing required fields.", [
        "Data is missing. At ./services/user.service.ts file",
      ]);
    }

    // Hash the password for security reasons
    const hashedPassword = await User.hashPassword(password);

    const newUser = await User.create({
      fullName: {
        firstName: fullName.firstName,
        lastName: fullName.lastName,
      }, // Create fullName object
      email,
      password: hashedPassword,
    });

    // Return the created user
    return newUser;
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
    throw new ApiError(500, "Error creating user.", errorMessages);
  }
};

export const findUserByEmail = async (
  email: string
): Promise<UserSchemaType | null> => {
  // Find a user by email
  try {
    // Find the user by email and select the password
    const user = await User.findOne({ email }).select("+password");

    // Return the found user
    return user;
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
