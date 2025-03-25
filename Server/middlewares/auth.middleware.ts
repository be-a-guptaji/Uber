import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/api/ApiError";
import { findUserById } from "../services/user.service";
import { isTokenBlacklisted } from "../services/blackListToken.service";

// Middleware to authenticate user
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Get the token from the request
  const token: string =
    req.cookies.token || req.headers.authorization?.split(" ")[1];

  // Check if the token exists
  if (!token) {
    // If the token is missing, return a 401 Unauthorized response
    res
      .status(401)
      .json(
        new ApiError(401, "Unauthorized.", [
          "The token is invalid.",
          "Token is missing.",
          "Token is expired.",
          "Token is Unauthorized.",
        ])
      );

    return;
  }

  // Check if the token is blacklisted
  const isBlacklisted = await isTokenBlacklisted(token);

  if (isBlacklisted) {
    // If the token is blacklisted, return a 401 Unauthorized response
    res
      .status(401)
      .json(
        new ApiError(401, "Unauthorized.", [
          "The token is invalid.",
          "Token is missing.",
          "Token is expired.",
          "Token is Unauthorized.",
        ])
      );

    return;
  }

  // Verify the token
  try {
    // Decode the token and assert the type to JwtPayload
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload;

    // Check if _id exists on the decoded object
    if (!decoded._id) {
      throw new ApiError(402, "Cannot decoded the token.", [
        "The token is invalid.",
        "Token is missing.",
        "Token is expired.",
        "Token is Unauthorized.",
      ]);
    }

    // Now you can safely use decoded._id
    const user = await findUserById(decoded._id);

    if (!user) {
      throw new ApiError(404, "User not found.", [
        "The token is invalid.",
        "Token is missing.",
        "Token is expired.",
        "Token is Unauthorized.",
      ]);
    }

    // Attach the user object to the request
    req.user = user;

    // Call the next middleware
    return next();
  } catch (error) {
    // If the token is invalid, return a 401 Unauthorized response
    res
      .status(401)
      .json(
        new ApiError(401, "Unauthorized.", [
          "The token is invalid.",
          "Token is missing.",
          "Token is expired.",
          "Token is Unauthorized.",
        ])
      );

    return;
  }
};
