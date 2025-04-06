import axios from "axios";
import { ApiError } from "../utils/api/ApiError";
import { CoordinatesType } from "../library/types";

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
