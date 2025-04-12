import { RideType } from "../library/types";
import Ride, { RideSchemaType } from "../models/ride.model";
import { ApiError } from "../utils/api/ApiError";
import { getFareFunction } from "../utils/functions/FareCalculator";
import { generateSixDigitCode } from "../utils/functions/randomCodeGenerator";

// Service to create a ride
export const createRideService = async ({
  user,
  pickup,
  destination,
  vehicleType,
}: RideType): Promise<RideSchemaType> => {
  try {
    if (!user || !pickup || !destination) {
      throw new ApiError(400, "Invalid ride details");
    }

    const fare = await getFareFunction(pickup, destination);

    const ride = await Ride.create({
      user,
      pickup,
      destination,
      otp: generateSixDigitCode() as string,
      fare: fare[vehicleType],
    });

    return ride;
  } catch {
    throw new ApiError(400, "Invalid ride details");
  }
};
