import express from "express";
import { body } from "express-validator";

// Create a new router
const router = express.Router();

router.post(
  "/create",
  body("userId")
    .isString()
    .isLength({ min: 24, max: 24 })
    .withMessage("Invalid user ID"),
  body("pickup")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Invalid pickup location"),
  body("destination")
    .isString()
    .isLength({ min: 2 })
    .withMessage("Invalid destination location")
);

// Export the router
export default router;
