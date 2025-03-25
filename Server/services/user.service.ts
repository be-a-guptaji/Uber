import User, { UserSchemaType } from "../models/user.model";
import { ApiError } from "../utils/api/ApiError";

// Define the user interface
type UserType = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
};

// Create a new user
export const createUser = async ({
  firstName,
  lastName,
  email,
  password,
}: UserType): Promise<UserSchemaType> => {
  // Validate the user data
  if (!firstName || !email || !password) {
    // Throw an error if any required field is missing
    throw new ApiError(400, "Missing required fields.");
  }

  // Create a new user
  try {
    const newUser = await User.create({
      fullName: { firstName, lastName }, // Create fullName object
      email,
      password,
    });

    // Return the created user
    return newUser;
  } catch (error) {
    // Ensure the error is a string or convert it to a string
    const errorMessage = error instanceof Error ? error.message : String(error);

    // Handle any errors during user creation
    throw new ApiError(500, "Error creating user.", [errorMessage]);
  }
};
