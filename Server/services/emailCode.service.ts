import EmailCode, { EmailCodeType } from "../models/emailCode.model";
import { ApiError } from "../utils/api/ApiError";
import { generateSixDigitCode } from "../utils/functions/randomCodeGenerator";

// Find verification code by email
export const findVerificationCodeByEmail = async (
  email: string
): Promise<EmailCodeType | null> => {
  try {
    // Find the verification code by email
    const emailCode = await EmailCode.findOne({ email });

    // Return the found verification code
    return emailCode;
  } catch (error: unknown) {
    // Ensure error is of type Error or handle it if it's something else
    let errorMessages: string[];

    // If error is an instance of Error, extract the message
    if (error instanceof Error) {
      errorMessages = [error.message];
    } else {
      // If error is not an instance of Error, convert it to a string
      errorMessages = [
        "Something went wrong at database connection. At ./services/email.service.ts file",
      ];
    }

    // Throw a custom API error with the error messages
    throw new ApiError(500, "Error finding verification code.", errorMessages);
  }
};

// Create a new verification code for new registration
export const createVerificationCode = async (
  email: string
): Promise<EmailCodeType> => {
  // Create a new verification code for new registration
  try {
    // Create a new verification code in the database
    const emailCode = await EmailCode.create({
      email,
      verificationCode: generateSixDigitCode(),
      case: "verificationCode",
    });

    // Return the created verification code
    return emailCode;
  } catch (error: unknown) {
    // Ensure error is of type Error or handle it if it's something else
    let errorMessages: string[];

    // If error is an instance of Error, extract the message
    if (error instanceof Error) {
      errorMessages = [error.message];
    } else {
      // If error is not an instance of Error, convert it to a string
      errorMessages = [
        "Something went wrong at database connection. At ./services/email.service.ts file",
      ];
    }

    // Throw a custom API error with the error messages
    throw new ApiError(500, "Error creating verification code.", errorMessages);
  }
};

// Create a new verification code for password reset
export const createPasswordResetCode = async (
  email: string
): Promise<EmailCodeType | null> => {
  // Create a new verification code for password reset
  try {
    // Create a new verification code in the database
    const emailCode = await EmailCode.create({
      email,
      verificationCode: generateSixDigitCode(),
      case: "resetPassword",
    });

    // Return the created verification code
    return emailCode;
  } catch (error: unknown) {
    // Ensure error is of type Error or handle it if it's something else
    let errorMessages: string[];

    // If error is an instance of Error, extract the message
    if (error instanceof Error) {
      errorMessages = [error.message];
    } else {
      // If error is not an instance of Error, convert it to a string
      errorMessages = [
        "Something went wrong at database connection. At ./services/email.service.ts file",
      ];
    }

    // Throw a custom API error with the error messages
    throw new ApiError(
      500,
      "Error creating password reset code.",
      errorMessages
    );
  }
};

// Create a new verification code for delete account
export const createDeleteAccountCode = async (
  email: string
): Promise<EmailCodeType | null> => {
  // Create a new verification code for delete account
  try {
    // Create a new verification code in the database
    const emailCode = await EmailCode.create({
      email,
      verificationCode: generateSixDigitCode(),
      case: "deleteAccount",
    });

    // Return the created verification code
    return emailCode;
  } catch (error: unknown) {
    // Ensure error is of type Error or handle it if it's something else
    let errorMessages: string[];
    // If error is an instance of Error, extract the message
    if (error instanceof Error) {
      errorMessages = [error.message];
    } else {
      // If error is not an instance of Error, convert it to a string
      errorMessages = [
        "Something went wrong at database connection. At ./services/email.service.ts file",
      ];
    }

    // Throw a custom API error with the error messages
    throw new ApiError(
      500,
      "Error creating delete account code.",
      errorMessages
    );
  }
};
