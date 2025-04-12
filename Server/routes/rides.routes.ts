import express from "express";
import { body, query } from "express-validator";
import { createRide, getFare } from "../controllers/rides.controller";
import { authUser } from "../middlewares/authUser.middleware";

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

// Export the router
export default router;
