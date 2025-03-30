import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { isTokenBlacklisted } from "../services/blackListToken.service";
import { findCaptainById } from "../services/captain.service";
import { ApiResponse } from "../utils/api/ApiResponse";

// Middleware to authenticate Captain
export const authCaptain = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Verify the token
  try {
    // Get the token from the request
    const token: string =
      req.cookies.token || req.headers.authorization?.split(" ")[1];

    // Check if the token exists
    if (!token) {
      // If the token is missing, return a 401 Unauthorized response
      res
        .status(401)
        .json(
          new ApiResponse(
            401,
            [
              "The token is invalid.",
              "Token is missing.",
              "Token is expired.",
              "Token is Unauthorized.",
            ],
            "Unauthorized."
          )
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
          new ApiResponse(
            401,
            [
              "The token is invalid.",
              "Token is missing.",
              "Token is expired.",
              "Token is Unauthorized.",
            ],
            "Unauthorized."
          )
        );

      return;
    }

    // Decode the token and assert the type to JwtPayload
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload;

    // Check if _id exists on the decoded object
    if (!decoded._id) {
      throw new ApiResponse(
        402,
        [
          "The token is invalid.",
          "Token is missing.",
          "Token is expired.",
          "Token is Unauthorized.",
        ],
        "Cannot decoded the token."
      );
    }

    // Now you can safely use decoded._id
    const captain = await findCaptainById(decoded._id);

    if (!captain) {
      throw new ApiResponse(
        404,
        [
          "The token is invalid.",
          "Token is missing.",
          "Token is expired.",
          "Token is Unauthorized.",
        ],
        "Captain not found."
      );
    }

    // Attach the Captain object to the request
    req.captain = captain;

    // Call the next middleware
    return next();
  } catch {
    // If the token is invalid, return a 401 Unauthorized response
    res
      .status(401)
      .json(
        new ApiResponse(
          401,
          [
            "The token is invalid.",
            "Token is missing.",
            "Token is expired.",
            "Token is Unauthorized.",
          ],
          "Unauthorized."
        )
      );

    return;
  }
};
