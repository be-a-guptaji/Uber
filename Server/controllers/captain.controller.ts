import { Request, Response } from "express";
import { ApiError } from "../utils/api/ApiError";
import { ApiResponse } from "../utils/api/ApiResponse";
import { createCaptain, findCaptainByEmail } from "../services/captain.service";
import { validationResult } from "express-validator";

// Register a new captain to the database
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
    const { fullName, email, password, vehicle } = req.body;

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

    // Return a success response
    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { token, captain: captainObj },
          "Captain created successfully."
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
