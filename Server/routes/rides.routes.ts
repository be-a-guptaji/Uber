import express from "express";
import { body, query } from "express-validator";
import {
  confirmRide,
  createRide,
  endRide,
  getFare,
  startRide,
} from "../controllers/rides.controller";
import { authUser } from "../middlewares/authUser.middleware";
import { authCaptain } from "../middlewares/authCaptain.middleware";

// Create a new router
const router = express.Router();

// Define the routes for the create ride
router.post(
  "/create",
  authUser,
  body("pickup")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Invalid pickup location"),
  body("destination")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Invalid destination location"),
  body("vehicleType")
    .isString()
    .isIn(["car", "auto", "motorcycle"])
    .withMessage("Invalid vehicle type"),
  createRide
);

// Define the routes for the get fare
router.get(
  "/get-fare",
  authUser,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  getFare
);

// Define the routes for the confirm ride
router.post(
  "/confirm",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  confirmRide
);

// Define the routes for the start ride
router.get(
  "/start-ride",
  authCaptain,
  query("rideId").isMongoId().withMessage("Invalid ride id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
  startRide
);

// Define the routes for the end ride
router.post(
  "/end-ride",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  endRide
);

// Export the router
export default router;
