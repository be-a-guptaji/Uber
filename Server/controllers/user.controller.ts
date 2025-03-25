import { Request, Response } from "express";
import { createUser, findUserByEmail } from "../services/user.service";
import { validationResult } from "express-validator";
import { ApiError } from "../utils/api/ApiError";
import { ApiResponse } from "../utils/api/ApiResponse";
import { addTokenToBlackList } from "../services/blackListToken.service";

// Register a new User to the database
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Check if the request body is valid
  const errors = validationResult(req);

  // If the request body is invalid, return an error response
  if (!errors.isEmpty()) {
    // Map errors to an array of error messages (strings)
    const errorMessages: string[] = errors.array().map((error) => error.msg);

    // Return an error response
    res
      .status(400)
      .json(new ApiError(400, "Invalid request body.", errorMessages));

    return;
  }

  try {
    // Destructure the request body
    const { fullName, email, password } = req.body;

    // Check if the email is already in use
    const isUserAlreadyExists = await findUserByEmail(email);

    // If the email is already in use, return an error response
    if (isUserAlreadyExists) {
      res
        .status(400)
        .json(
          new ApiError(400, "Email already in use.", [
            "This email is already in use. Try registering with a different email.",
          ])
        );

      return;
    }

    // Create a new User
    const user = await createUser({
      fullName,
      email,
      password,
    });

    // Generating Auth token using Instance method
    const token = user.generateAuthToken();

    // Convert to plain object before modifying
    const userObj = user.toObject();

    // Remove the password field
    delete userObj.password;

    // Return a success response
    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { token, user: userObj },
          "User created successfully."
        )
      );

    return;
  } catch (error) {
    // If an error occurs, return an error response
    res
      .status(500)
      .json(
        new ApiError(
          500,
          "Something went wrong while registering your account.",
          [
            "This email might be in use. Try registering with a different email.",
          ]
        )
      );

    return;
  }
};

// Login a User through email and password
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  // Check if the request body is valid
  const errors = validationResult(req);

  // If the request body is invalid, return an error response
  if (!errors.isEmpty()) {
    // Map errors to an array of error messages (strings)
    const errorMessages: string[] = errors.array().map((error) => error.msg);

    // Return an error response
    res
      .status(400)
      .json(new ApiError(400, "Invalid request body.", errorMessages));

    return;
  }

  try {
    // Destructure the request body
    const { email, password } = req.body;

    // Create a new User
    const user = await findUserByEmail(email);

    if (!user) {
      // If User is not found, return an error response
      res
        .status(401)
        .json(
          new ApiError(401, "User not found.", ["Invalid email or password."])
        );

      return;
    }

    // Compare the provided password with the User's password
    const isMatch = await user.comparePassword(password);

    // If the passwords do not match, return an error response
    if (!isMatch) {
      res
        .status(401)
        .json(
          new ApiError(401, "User not found.", ["Invalid email or password."])
        );

      return;
    }

    // Generating Auth token using Instance method
    const token = user.generateAuthToken();

    // Convert to plain object before modifying
    const userObj = user.toObject();

    // Remove the password field
    delete userObj.password;

    // Set the token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    // Return a success response
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { token, user: userObj },
          "User logged in successfully."
        )
      );

    return;
  } catch (error) {
    // If an error occurs, return an error response
    res
      .status(500)
      .json(
        new ApiError(500, "Something went wrong while loging your account.", [
          "Invalid email or password.",
        ])
      );

    return;
  }
};

// Get User profile through the cookies
export const getUserProfile = async (req: Request, res: Response) => {
  // Return a success response
  res
    .status(200)
    .json(new ApiResponse(200, req.user, "User profile successfully fetched."));

  return;
};

// Logout a User
export const logoutUser = async (req: Request, res: Response) => {
  try {
    // Retreiving the token from the request headers or cookies
    const token: string =
      req.cookies.token || req.headers.authorization?.split(" ")[1];

    // Add the token to the blacklist
    await addTokenToBlackList(token);

    // Clear the token cookie
    res.clearCookie("token");

    // Return a success response
    res
      .status(200)
      .json(new ApiResponse(200, null, "User logged out successfully."));

    return;
  } catch (error) {
    // If an error occurs, return an error response
    res
      .status(500)
      .json(
        new ApiError(500, "Unable to logout.", [
          "Token cannot be deleted.",
          "Token cannot be added to blacklist.",
        ])
      );

    return;
  }
};
