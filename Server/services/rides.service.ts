import { Document } from "mongoose";
import { RideType } from "../library/types";
import { CaptainSchemaType } from "../models/captain.model";
import Ride, { RideSchemaType } from "../models/ride.model";
import { UserSchemaType } from "../models/user.model";
import { ApiError } from "../utils/api/ApiError";
import { getFareFunction } from "../utils/functions/FareCalculator";
import { generateSixDigitCode } from "../utils/functions/randomCodeGenerator";

// Interface for StartRideParams
interface StartRideParams {
  rideId: string;
  otp: string;
  captain: CaptainSchemaType;
}

// Interface for EndRideParams
interface EndRideParams {
  rideId: string;
  captain: CaptainSchemaType;
}

// Interface for ConfirmRideParams
interface ConfirmRideParams {
  rideId: string;
  captain: CaptainSchemaType;
}

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

// Confirm Ride
export const confirmRideService = async ({
  rideId,
  captain,
}: ConfirmRideParams): Promise<any> => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  await Ride.findOneAndUpdate(
    { _id: rideId },
    { status: "accepted", captain: captain._id }
  );

  const ride = await Ride.findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

// Start Ride
export const startRideService = async ({
  rideId,
  otp,
  captain,
}: StartRideParams): Promise<any> => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP are required");
  }

  const ride = await Ride.findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride not accepted");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await Ride.findOneAndUpdate({ _id: rideId }, { status: "ongoing" });

  return ride;
};

// End Ride
export const endRideService = async ({
  rideId,
  captain,
}: EndRideParams): Promise<any> => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  const ride = await Ride.findOne({
    _id: rideId,
    captain: captain._id,
  })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride not ongoing");
  }

  await Ride.findOneAndUpdate({ _id: rideId }, { status: "completed" });

  return ride;
};
