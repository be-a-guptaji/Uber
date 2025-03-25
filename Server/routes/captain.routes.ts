import express from "express";
import { body } from "express-validator";
import { registerCaptain } from "../controllers/captain.controller";

// Create a new router
const router = express.Router();

// Route to register a new Captain
router.post(
  "/register",
  [
    body("fullName.firstName")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long"),
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 2 })
      .withMessage("Color must be at least 2 characters long"),
    body("vehicle.licencePlate")
      .isLength({ min: 6 })
      .withMessage("Licence plate must be at least 6 characters long"),
    body("vehicle.capacity")
      .isNumeric()
      .isInt({ min: 1 })
      .withMessage("Capacity must be a number"),
    body("vehicle.vehicleType")
      .isLength({ min: 2 })
      .withMessage("Vehicle type must be at least 2 characters long"),
  ],
  registerCaptain
);

// Export the router
export default router;
