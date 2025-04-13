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

// Function to create a new ride
export const createRide = async (
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
    const { pickup, destination, vehicleType } = req.body;

    // Check if the userId is valid
    const ride = await createRideService({
      user: req.user?._id as string,
      pickup,
      destination,
      vehicleType,
    });

    // Get the coordinates of the pickup and destination addresses
    res.status(201).json(new ApiResponse(201, ride, "Ride created."));
  } catch {
    // If an error occurs, return an error response
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          ["Something went wrong while creating your ride."],
          "Internal server error."
        )
      );

    return;
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
export const startRide = async (
  req: Request,
  res: Response
): Promise<Response> => {
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

    return res.status(200).json(new ApiResponse(200, ride, "Ride started."));
  } catch (err: any) {
    return res.status(500).json(new ApiResponse(500, [], err.message));
  }
};

// End Ride
export const endRide = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
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

    return res.status(200).json(new ApiResponse(200, ride, "Ride ended."));
  } catch (err: any) {
    return res.status(500).json(new ApiResponse(500, [], err.message));
  }
};
