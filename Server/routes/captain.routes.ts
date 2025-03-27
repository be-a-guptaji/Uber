import express from "express";
import { body } from "express-validator";
import {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
} from "../controllers/captain.controller";
import { authCaptain } from "../middlewares/authCaptain.middleware";

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

// Route to login a Captain
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginCaptain
);

// Route to get Captain profile
router.get("/profile", authCaptain, getCaptainProfile);

// Route to logout a Captain
router.get("/logout", authCaptain, logoutCaptain);

// Export the router
export default router;
