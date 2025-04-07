import express from "express";
import { body } from "express-validator";
import { authUser } from "../middlewares/authUser.middleware";
import {
  getAutoCompleteSuggestions,
  getCoordinates,
  getDistanceTime,
} from "../controllers/maps.controller";
import { query } from "express-validator";

// Create a new router
const router = express.Router();

// Route to get coordinates
router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 2 }),
  authUser,
  getCoordinates
);

// Route to get time from coordinates
router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 2 }),
  query("destination").isString().isLength({ min: 2 }),
  authUser,
  getDistanceTime
);

// Route to get suggetions
router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  authUser,
  getAutoCompleteSuggestions
);

// Export the router
export default router;
