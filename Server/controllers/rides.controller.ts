import { Request, Response } from "express";
import { ApiResponse } from "../utils/api/ApiResponse";
import { validationResult } from "express-validator";
import {
  confirmRideService,
  createRideService,
  endRideService,
  startRideService,
} from "../services/rides.service";
import { getFareFunction } from "../utils/functions/FareCalculator";
import { sendMessageToSocketId } from "../Socket";
import Ride from "../models/ride.model";
import { CaptainSchemaType } from "../models/captain.model";
import {
  getAddressCoordinates,
  getCaptainsInTheRadius,
} from "../services/maps.service";

// Function to create a new ride
export const createRide = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    res
      .status(400)
      .json(new ApiResponse(400, errorMessages, "Invalid request body."));
    return;
  }

  try {
    const { pickup, destination, vehicleType } = req.body;

    // Create the ride
    const ride = await createRideService({
      user: req.user?._id as string,
      pickup,
      destination,
      vehicleType,
    });

    // Respond to client immediately
    res.status(201).json(new ApiResponse(201, ride, "Ride created."));

    // Get coordinates of the pickup address
    const pickupCoordinates = await getAddressCoordinates(pickup);

    // Find captains nearby (within 2km radius)
    const captainsInRadius = await getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    );

    // Ensure OTP is hidden (optional — based on your original logic)
    ride.otp = "";

    // Fetch ride again with populated user
    const rideWithUser = await Ride.findById(ride._id).populate("user");

    // Notify each nearby captain via socket
    captainsInRadius.forEach((captain: CaptainSchemaType) => {
      if (captain.socketId) {
        sendMessageToSocketId({
          socketId: captain.socketId,
          event: "new-ride",
          data: rideWithUser,
        });
      }
    });
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          [err.message || "Something went wrong while creating the ride."],
          "Internal server error."
        )
      );
  }
};

// Function to get the fare for a ride
export const getFare = async (req: Request, res: Response): Promise<void> => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(400)
      .json(new ApiResponse(400, errors.array(), "Invalid request."));
    return;
  }

  const { pickup, destination } = req.query;

  try {
    // You may want to ensure pickup and destination are defined here too
    if (!pickup || !destination) {
      res
        .status(400)
        .json(new ApiResponse(400, [], "Pickup and destination are required."));
      return;
    }

    const fare = await getFareFunction(pickup as string, destination as string);
    res.status(200).json(new ApiResponse(200, fare, "Fare calculated."));
    return;
  } catch (err: any) {
    res.status(500).json(new ApiResponse(500, [], err.message));
    return;
  }
};

// Confirm Ride
export const confirmRide = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(400)
      .json(new ApiResponse(400, errors.array(), "Invalid request."));
  }

  const { rideId } = req.body;

  try {
    const ride = await confirmRideService({
      rideId,
      captain: req.captain!,
    });

    sendMessageToSocketId({
      socketId: ride.user.socketId as string,
      event: "ride-confirmed",
      data: ride,
    });

    res.status(200).json(new ApiResponse(200, ride, "Ride confirmed."));
  } catch (err: any) {
    console.error(err);
    res.status(500).json(new ApiResponse(500, [], err.message));
  }
};

// Start Ride
export const startRide = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(400)
      .json(new ApiResponse(400, errors.array(), "Invalid request."));
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await startRideService({
      rideId: rideId as string,
      otp: otp as string,
      captain: req.captain!,
    });

    sendMessageToSocketId({
      socketId: ride.user.socketId as string,
      event: "ride-started",
      data: ride,
    });

    res.status(200).json(new ApiResponse(200, ride, "Ride started."));
  } catch (err: any) {
    res.status(500).json(new ApiResponse(500, [], err.message));
  }
};

// End Ride
export const endRide = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(400)
      .json(new ApiResponse(400, errors.array(), "Invalid request."));
  }

  const { rideId } = req.body;

  try {
    const ride = await endRideService({ rideId, captain: req.captain! });

    sendMessageToSocketId({
      socketId: ride.user.socketId as string,
      event: "ride-ended",
      data: ride,
    });

    res.status(200).json(new ApiResponse(200, ride, "Ride ended."));
  } catch (err: any) {
    res.status(500).json(new ApiResponse(500, [], err.message));
  }
};
