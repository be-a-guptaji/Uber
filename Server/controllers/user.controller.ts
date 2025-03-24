import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { createUser } from "../services/user.service";
import { validationResult } from "express-validator";

// Register a new user to the database
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Check if the request body is valid
  const errors = validationResult(req);

  // If the request body is invalid, return an error response
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
};
