import { Api } from "../axios";

// Api call to create a new Ride in the database
export const createRide = async (
  pickup: string,
  destination: string,
  vehicleType: string
): Promise<undefined> => {
  const response = await Api.post(
    "/rides/create-ride",
    { pickup, destination, vehicleType },
    {
      withCredentials: true,
    }
  );

  // Return the full response data
  return response.data.data;
};
