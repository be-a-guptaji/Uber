import Captain, { CaptainSchemaType } from "../models/captain.model";
import { ApiError } from "../utils/api/ApiError";

// Define the vehicle interface
interface VehicleType {
  color: string;
  licencePlate: string;
  capacity: number;
  vehicleType: string;
}

// Define the Captain interface
interface CaptainType {
  fullName: {
    firstName: string;
    lastName?: string;
  };
  email: string;
  password: string;
  vehicle: VehicleType;
}

// Create a new Captain
export const createCaptain = async ({
  fullName,
  email,
  password,
  vehicle,
}: CaptainType): Promise<CaptainSchemaType> => {
  // Create a new Captain using the hashed password
  try {
    // Validate the Captain data
    if (
      !fullName.firstName ||
      !email ||
      !password ||
      !vehicle.color ||
      !vehicle.licencePlate ||
      !vehicle.capacity ||
      !vehicle.vehicleType
    ) {
      // Throw an error if any required field is missing
      throw new ApiError(400, "Missing required fields.", [
        "Data is missing. At ./services/captain.service.ts file",
      ]);
    }

    // Hash the password for security reasons
    const hashedPassword = await Captain.hashPassword(password);

    const newCaptain = await Captain.create({
      fullName,
      email,
      password: hashedPassword,
      vehicle,
    });

    // Return the created Captain
    return newCaptain;
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
    throw new ApiError(500, "Error creating Captain.", errorMessages);
  }
};

// Find a Captain by email
export const findCaptainByEmail = async (
  email: string
): Promise<CaptainSchemaType | null> => {
  // Find a Captain by email
  try {
    // Find the Captain by email and select the password
    const captain = await Captain.findOne({ email }).select("+password");

    // Return the found Captain
    return captain;
  } catch (error: unknown) {
    // Ensure error is of type Error or handle it if it's something else
    let errorMessages: string[];

    // If error is an instance of Error, extract the message
    if (error instanceof Error) {
      errorMessages = [error.message];
    } else {
      // If error is not an instance of Error, convert it to a string
      errorMessages = [
        "Something went wrong at database connection. At ./services/captain.service.ts file",
      ];
    }

    // Throw a custom API error with the error messages
    throw new ApiError(500, "Error finding Captain.", errorMessages);
  }
};

// Find a Captain by ID
export const findUserById = async (
  id: string
): Promise<CaptainSchemaType | null> => {
  // Find a Captain by ID
  try {
    // Find the Captain by ID and select the password
    const captain = await Captain.findById(id).select("+password");

    // Return the found Captain
    return captain;
  } catch (error: unknown) {
    // Ensure error is of type Error or handle it if it's something else
    let errorMessages: string[];

    // If error is an instance of Error, extract the message
    if (error instanceof Error) {
      errorMessages = [error.message];
    } else {
      // If error is not an instance of Error, convert it to a string
      errorMessages = [
        "Something went wrong at database connection. At ./services/captain.service.ts file",
      ];
    }

    // Throw a custom API error with the error messages
    throw new ApiError(500, "Error finding Captain.", errorMessages);
  }
};
