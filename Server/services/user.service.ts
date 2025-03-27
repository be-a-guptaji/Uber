import { UserType } from "../library/types";
import User, { UserSchemaType } from "../models/user.model";
import { ApiError } from "../utils/api/ApiError";

// Create a new User
export const createUser = async ({
  fullName,
  email,
  password,
}: UserType): Promise<UserSchemaType> => {
  // Create a new User using the hashed password
  try {
    // Validate the User data
    if (!fullName.firstName || !email || !password) {
      // Throw an error if any required field is missing
      throw new ApiError(400, "Missing required fields.", [
        "Data is missing. At ./services/user.service.ts file",
      ]);
    }

    // Hash the password for security reasons
    const hashedPassword = await User.hashPassword(password);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // Return the created User
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
    throw new ApiError(500, "Error creating User.", errorMessages);
  }
};

// Find a User by email
export const findUserByEmail = async (
  email: string
): Promise<UserSchemaType | null> => {
  // Find a User by email
  try {
    // Find the User by email and select the password
    const user = await User.findOne({ email }).select("+password");

    // Return the found User
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
    throw new ApiError(500, "Error finding User.", errorMessages);
  }
};

// Find a User by ID
export const findUserById = async (
  id: string
): Promise<UserSchemaType | null> => {
  // Find a User by ID
  try {
    // Find the User by ID and select the password
    const user = await User.findById(id).select("+password");

    // Return the found User
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
    throw new ApiError(500, "Error finding User.", errorMessages);
  }
};
