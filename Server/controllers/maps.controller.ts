import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { getAddressCoordinates } from "../services/maps.service";
import { ApiResponse } from "../utils/api/ApiResponse";

// Get the map Coordinates from the address
export const getCoordinates = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Validate the request
  const errors = validationResult(req);

  // Check for validation errors
  if (!errors.isEmpty()) {
    // If there are validation errors, send a 400 response with the errors
    res
      .status(400)
      .json(new ApiResponse(400, errors.array(), "Invalid request body."));
  }

  // Retrieve the address from the request query
  const { address } = req.query;

  // Get the coordinates from the address using the service
  try {
    // Get the coordinates from the address using the service and send the response
    const coordinates = await getAddressCoordinates(address as string);

    // Send the response with the coordinates
    res
      .status(200)
      .json(
        new ApiResponse(200, coordinates, "Coordinates fetched successfully")
      );
  } catch {
    // Handle errors and send the response with the error message
    res.status(404).json(new ApiResponse(404, null, "Coordinates not found"));
  }
};
