import express from "express";
import { body } from "express-validator";
import { createRide } from "../controllers/rides.controller";
import { authUser } from "../middlewares/authUser.middleware";

// Create a new router
const router = express.Router();

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

// Export the router
export default router;
