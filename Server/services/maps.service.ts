import axios from "axios";
import { ApiError } from "../utils/api/ApiError";
import { CoordinatesType, DistanceTimeType } from "../library/types";
import Captain, { CaptainSchemaType } from "../models/captain.model";

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
): Promise<DistanceTimeType> => {
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

// Get the autocomplete suggestions from the address
export const getAutoCompleteSuggestionsService = async (
  input: string
): Promise<any> => {
  if (!input) {
    throw new ApiError(400, "Missing required fields.");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions
        .map((prediction: any) => prediction.description)
        .filter((value: string) => value);
    } else {
      throw new ApiError(500, "Unable to fetch suggestions");
    }
  } catch {
    throw new ApiError(500, "Unable to fetch suggestions");
  }
};

// Get the captains in the radius
export const getCaptainsInTheRadius = async (
  latitude: number,
  longitude: number,
  radius: number
): Promise<CaptainSchemaType[]> => {
  const captains = await Captain.find({
    location: {
      $geoWithin: {
        $centerSphere: [[latitude, longitude], radius / 6371], // Earth radius in km
      },
    },
  });

  return captains;
};