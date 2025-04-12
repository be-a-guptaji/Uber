import { Api } from "../axios";

// Export the function for the fare calculation
export const calculateFare = async (
  pickup: string,
  destination: string
): Promise<{
  [key: string]: number;
}> => {
  // Make a request to the server to calculate the fare
  const response = await Api.get(`/rides/get-fare`, {
    params: { pickup, destination },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // Return the fare data from the response
  return response.data.data;
};
