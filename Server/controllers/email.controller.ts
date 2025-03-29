import { Request, Response } from "express";
import { ApiError } from "../utils/api/ApiError";
import { validationResult } from "express-validator";
import { ApiResponse } from "../utils/api/ApiResponse";
import { findUserByEmail } from "../services/user.service";
import { createVerificationCode } from "../services/emailCode.service";
import { findCaptainByEmail } from "../services/captain.service";
import { SendVerificationEmail } from "../utils/Mails/SendVerificationEmail";

// Send an email to the User to verify their email address
export const sendVerificationEmailToUser = async (
  req: Request,
  res: Response
) => {
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
    const { email } = req.body;

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

    // Create a new verification code for new registration
      const verificationCode = await createVerificationCode(email);
      
      // Send the verification code to the user's email
      await SendVerificationEmail();

    // Return a success response
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          `Verification code has been sent to your email at ${email}`,
          "Verification code has been sent to your email."
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

// Send an email to the Captain to verify their email address
export const sendVerificationEmailToCaptain = async (
  req: Request,
  res: Response
) => {
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
    const { email } = req.body;

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

    // Create a new verification code for new registration
    await createVerificationCode(email);

    // Return a success response
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          `Verification code has been sent to your email at ${email}`,
          "Verification code has been sent to your email."
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
