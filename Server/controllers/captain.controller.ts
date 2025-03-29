import { Request, Response } from "express";
import { ApiError } from "../utils/api/ApiError";
import { ApiResponse } from "../utils/api/ApiResponse";
import { createCaptain, findCaptainByEmail } from "../services/captain.service";
import { validationResult } from "express-validator";
import { addTokenToBlackList } from "../services/blackListToken.service";
import { findVerificationCodeByEmail } from "../services/code.service";

// Register a new Captain to the database
export const registerCaptain = async (
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
    const { fullName, email, password, vehicle, verificationCode } = req.body;

    // Check if the email is already in use
    const isCaptainAlreadyExists = await findCaptainByEmail(email);

    // If the email is already in use, return an error response
    if (isCaptainAlreadyExists) {
      res
        .status(400)
        .json(
          new ApiError(400, "Email already in use.", [
            "This email is already in use. Try registering with a different email.",
          ])
        );

      return;
    }

    // Check if the verification code is valid to register the user
    const isValidCode = await findVerificationCodeByEmail(
      email,
      "verificationCode"
    );

    // If the verification code is not valid, return an error response
    if (!isValidCode) {
      res
        .status(400)
        .json(
          new ApiError(400, "Invalid verification code.", [
            "The verification code is invalid. Try registering again.",
          ])
        );

      return;
    }

    // Compare the provided code with the Captain's Verification code
    const isMatch = await isValidCode.compareCode(verificationCode);

    // If the passwords do not match, return an error response
    if (!isMatch) {
      res
        .status(401)
        .json(
          new ApiError(401, "Invalid verification code.", [
            "The verification code is invalid. Try registering again.",
          ])
        );

      return;
    }

    // Create a new Captain
    const captain = await createCaptain({
      fullName,
      email,
      password,
      vehicle,
    });

    // Generating Auth token using Instance method
    const token = captain.generateAuthToken();

    // Convert to plain object before modifying
    const captainObj = captain.toObject();

    // Remove the password field
    delete captainObj.password;

    // Set the token as a cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        path: "/",
        expires: new Date(
          Date.now() + 60 * 60 * 1000 * parseInt(process.env.JWT_EXPIRY)
        ),
        maxAge: 60 * 60 * 1000 * parseInt(process.env.JWT_EXPIRY),
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      })
      .status(201)
      .json(
        new ApiResponse(
          201,
          { captain: captainObj },
          "Captain created successfully."
        ) // Return a success response
      );

    return;
  } catch {
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

// Login a Captain through email and password
export const loginCaptain = async (
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
    const { email, password } = req.body;

    // Create a new Captain
    const captain = await findCaptainByEmail(email);

    if (!captain) {
      // If Captain is not found, return an error response
      res
        .status(401)
        .json(
          new ApiError(401, "Captain not found.", [
            "Invalid email or password.",
          ])
        );

      return;
    }

    // Compare the provided password with the Captain's password
    const isMatch = await captain.comparePassword(password);

    // If the passwords do not match, return an error response
    if (!isMatch) {
      res
        .status(401)
        .json(
          new ApiError(401, "Captain not found.", [
            "Invalid email or password.",
          ])
        );

      return;
    }

    // Get the old token from the request
    const oldToken: string =
      req.cookies.token || req.headers.authorization?.split(" ")[1];

    // If the old token exists
    if (oldToken) {
      // Add the token to the blacklist if it exists
      await addTokenToBlackList(oldToken);
    }

    // Generating Auth token using Instance method
    const token = captain.generateAuthToken();

    // Convert to plain object before modifying
    const captainObj = captain.toObject();

    // Remove the password field
    delete captainObj.password;

    // Set the token as a cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        path: "/",
        expires: new Date(
          Date.now() + 60 * 60 * 1000 * parseInt(process.env.JWT_EXPIRY)
        ),
        maxAge: 60 * 60 * 1000 * parseInt(process.env.JWT_EXPIRY),
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      })
      .status(200)
      .json(
        new ApiResponse(
          200,
          { captain: captainObj },
          "Captain logged in successfully."
        ) // Return a success response
      );

    return;
  } catch {
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

// Get Captain profile through the cookies
export const getCaptainProfile = async (req: Request, res: Response) => {
  // Check if the Captain is authenticated
  if (!req.captain) {
    res
      .status(401)
      .json(
        new ApiError(401, "Unauthorized.", [
          "The token is invalid.",
          "Token is missing.",
          "Token is expired.",
          "Token is Unauthorized.",
        ])
      );

    return;
  }

  // Find the Captain by email
  const captain = await findCaptainByEmail(req.captain.email);

  // If Captain is not found, return an error response
  if (!captain) {
    // If Captain is not found, return an error response
    res
      .status(401)
      .json(
        new ApiError(401, "Captain not found.", ["Invalid email or password."])
      );

    return;
  }

  // Get the old token from the request
  const oldToken: string =
    req.cookies.token || req.headers.authorization?.split(" ")[1];

  // If the old token exists
  if (oldToken) {
    // Add the token to the blacklist if it exists
    await addTokenToBlackList(oldToken);
  }

  // Generating Auth token using Instance method
  const token = captain.generateAuthToken();

  // Convert to plain object before modifying
  const captainObj = captain.toObject();

  // Remove the password field
  delete captainObj.password;

  // Return a success response
  res
    .cookie("token", token, {
      httpOnly: true,
      path: "/",
      expires: new Date(
        Date.now() + 60 * 60 * 1000 * parseInt(process.env.JWT_EXPIRY)
      ),
      maxAge: 60 * 60 * 1000 * parseInt(process.env.JWT_EXPIRY),
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    }) // Set the token as a cookie
    .status(200)
    .json(
      new ApiResponse(200, req.captain, "Captain profile successfully fetched.") // Return a data response
    );

  return;
};

// Logout a Captain
export const logoutCaptain = async (req: Request, res: Response) => {
  try {
    // Retreiving the token from the request headers or cookies
    const token: string =
      req.cookies.token || req.headers.authorization?.split(" ")[1];

    // Add the token to the blacklist
    await addTokenToBlackList(token);

    // Clear the token cookie
    res
      .clearCookie("token")
      .status(200)
      .json(new ApiResponse(200, null, "Captain logged out successfully.")); // Return a success response

    return;
  } catch {
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
