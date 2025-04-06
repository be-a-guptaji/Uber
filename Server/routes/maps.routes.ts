import express from "express";
import { body } from "express-validator";
import { authUser } from "../middlewares/authUser.middleware";
import { getCoordinates } from "../controllers/maps.controller";
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

// Export the router
export default router;
