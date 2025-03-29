import EmailCode, { EmailCodeType } from "../models/emailCode.model";
import { ApiError } from "../utils/api/ApiError";

// Find verification code by email
export const findVerificationCodeByEmail = async (
  email: string,
  type: string
): Promise<EmailCodeType | null> => {
  try {
    // Find the verification code by email
    const emailCode = await EmailCode.findOne({
      email,
      usage: type,
    });

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
  email: string,
  code: string
): Promise<EmailCodeType> => {
  // Create a new verification code for new registration
  try {
    // Find if the user already has a verification code
    const existingVerificationCode = await findVerificationCodeByEmail(
      email,
      "verificationCode"
    );

    // If the user already has a verification code, delete it
    if (existingVerificationCode) {
      await deleteVerificationCodeByEmail(email, "verificationCode");
    }

    // Hash the verification code for security reasons
    const hashedVerificationCode = await EmailCode.hashCode(code);

    // Create a new verification code in the database
    const emailCode = await EmailCode.create({
      email,
      verificationCode: hashedVerificationCode,
      usage: "verificationCode",
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
  email: string,
  code: string
): Promise<EmailCodeType | null> => {
  // Create a new verification code for password reset
  try {
    // Find if the user already has a verification code
    const existingVerificationCode = await findVerificationCodeByEmail(
      email,
      "resetPassword"
    );

    // If the user already has a verification code, delete it
    if (existingVerificationCode) {
      await deleteVerificationCodeByEmail(email, "resetPassword");
    }

    // Hash the verification code for security reasons
    const hashedVerificationCode = await EmailCode.hashCode(code);

    // Create a new verification code in the database
    const emailCode = await EmailCode.create({
      email,
      verificationCode: hashedVerificationCode,
      usage: "resetPassword",
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
  email: string,
  code: string
): Promise<EmailCodeType | null> => {
  // Create a new verification code for delete account
  try {
    // Find if the user already has a verification code
    const existingVerificationCode = await findVerificationCodeByEmail(
      email,
      "deleteAccount"
    );

    // If the user already has a verification code, delete it
    if (existingVerificationCode) {
      await deleteVerificationCodeByEmail(email, "deleteAccount");
    }

    // Hash the verification code for security reasons
    const hashedVerificationCode = await EmailCode.hashCode(code);

    // Create a new verification code in the database
    const emailCode = await EmailCode.create({
      email,
      verificationCode: hashedVerificationCode,
      usage: "deleteAccount",
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

// Delete a verification code by email
export const deleteVerificationCodeByEmail = async (
  email: string,
  type: string
): Promise<void> => {
  try {
    // Attempt to delete the verification code by email and code
    const result = await EmailCode.deleteMany({ email, usage: type });

    // If no document was deleted, handle it as a specific error case
    if (result.deletedCount === 0) {
      throw new Error("No matching verification code found.");
    }
  } catch (error: unknown) {
    let errorMessages: string[];

    // Handle if error is an instance of Error, and extract the message
    if (error instanceof Error) {
      errorMessages = [
        error.message,
        `Failed to delete verification code for email: ${email}, code: ${type}. At ./services/email.service.ts file`,
      ];
    } else {
      // If error is not an instance of Error, convert it to a string
      errorMessages = [
        "Something went wrong at database connection. At ./services/email.service.ts file",
      ];
    }

    // Throw a custom API error with a status code and the error messages
    throw new ApiError(500, "Error deleting verification code.", errorMessages);
  }
};
