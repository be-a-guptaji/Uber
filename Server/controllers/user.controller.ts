import { Request, Response } from "express";
import { createUser, findUserByEmail } from "../services/user.service";
import { validationResult } from "express-validator";
import { ApiResponse } from "../utils/api/ApiResponse";
import { addTokenToBlackList } from "../services/blackListToken.service";
import { findVerificationCodeByEmail } from "../services/code.service";

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
      .json(new ApiResponse(400, errorMessages, "Invalid request body."));

    return;
  }

  try {
    // Destructure the request body
    const { fullName, email, password, verificationCode } = req.body;

    // Check if the email is already in use
    const isUserAlreadyExists = await findUserByEmail(email);

    // If the email is already in use, return an error response
    if (isUserAlreadyExists) {
      res
        .status(400)
        .json(
          new ApiResponse(
            400,
            [
              "This email is already in use. Try registering with a different email.",
            ],
            "Email already in use."
          )
        );

      return;
    }

    // Check if the verification code is valid to register the User
    const isValidCode = await findVerificationCodeByEmail(
      email,
      "verificationCode"
    );

    // If the verification code is not valid, return an error response
    if (!isValidCode) {
      res
        .status(400)
        .json(
          new ApiResponse(
            400,
            ["The verification code is invalid. Try registering again."],
            "Invalid verification code."
          )
        );

      return;
    }

    // Compare the provided code with the User's Verification code
    const isMatch = await isValidCode.compareCode(verificationCode);

    // If the passwords do not match, return an error response
    if (!isMatch) {
      res
        .status(401)
        .json(
          new ApiResponse(
            401,
            ["The verification code is invalid. Try registering again."],
            "Invalid verification code."
          )
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
        new ApiResponse(201, { user: userObj }, "User created successfully.") // Return a success response
      );

    return;
  } catch {
    // If an error occurs, return an error response
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          [
            "This email might be in use. Try registering with a different email.",
          ],
          "Something went wrong while registering your account."
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
      .json(new ApiResponse(400, errorMessages, "Invalid request body."));

    return;
  }

  try {
    // Destructure the request body
    const { email, password } = req.body;

    // Find the User by email
    const user = await findUserByEmail(email);

    if (!user) {
      // If User is not found, return an error response
      res
        .status(401)
        .json(
          new ApiResponse(
            401,
            ["Invalid email or password."],
            "User not found."
          )
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
          new ApiResponse(
            401,
            ["Invalid email or password."],
            "User not found."
          )
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
    const token = user.generateAuthToken();

    // Convert to plain object before modifying
    const userObj = user.toObject();

    // Remove the password field
    delete userObj.password;

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
        new ApiResponse(200, { user: userObj }, "User logged in successfully.") // Return a success response
      );

    return;
  } catch {
    // If an error occurs, return an error response
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          ["Invalid email or password."],
          "Something went wrong while loging your account."
        )
      );

    return;
  }
};

// Get User profile through the cookies
export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Check if the User is authenticated
  if (!req.user) {
    res.status(401).json(new ApiResponse(401, null, "Unauthorized."));

    return;
  }

  // Find the User by email
  const user = await findUserByEmail(req.user.email);

  // If User is not found, return an error response
  if (!user) {
    // If User is not found, return an error response
    res.status(401).json(new ApiResponse(401, null, "User not found."));

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
  const token = user.generateAuthToken();

  // Convert to plain object before modifying
  const userObj = user.toObject();

  // Remove the password field
  delete userObj.password;

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
      new ApiResponse(
        200,
        { user: userObj },
        "User profile successfully fetched."
      ) // Return a data response
    );

  return;
};

// Logout a User
export const logoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
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
      .json(new ApiResponse(200, null, "User logged out successfully.")); // Return a success response

    return;
  } catch {
    // If an error occurs, return an error response
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          ["Token cannot be deleted.", "Token cannot be added to blacklist."],
          "Unable to logout."
        )
      );

    return;
  }
};
