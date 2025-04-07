import axios from "axios";
import { ApiError } from "../utils/api/ApiError";
import { CoordinatesType } from "../library/types";

// Get the map Coordinates from the address
export const getAddressCoordinates = async (
  address: string
): Promise<CoordinatesType> => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        ltd: location.lat as number,
        lng: location.lng as number,
      };
    } else {
      throw new ApiError(
        400,
        "Unable to fetch coordinates from Google Maps API"
      );
    }
  } catch {
    throw new ApiError(500, "Unable to fetch coordinates from Google Maps API");
  }
};

// Get the distance and time from the coordinates
export const getDistanceTimeService = async (
  origin: string,
  destination: string
): Promise<unknown> => {
  if (!origin || !destination) {
    throw new ApiError(400, "Missing required fields.");
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new ApiError(400, "No routes found");
      }

      return response.data.rows[0].elements[0];
    } else {
      throw new ApiError(500, "Unable to fetch distance and time");
    }
  } catch {
    throw new ApiError(500, "Unable to fetch distance and time");
  }
};
