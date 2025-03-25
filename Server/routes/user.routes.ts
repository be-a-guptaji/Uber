import express from "express";
import { body } from "express-validator";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/user.controller";

// Create a new router
const router = express.Router();

// Route to register a new user
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("fullName.firstName")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long"),
  ],
  registerUser
);

// Route to login a user
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginUser
);

// Route to get user profile
router.get("/profile", getUserProfile);

// Export the router
export default router;
