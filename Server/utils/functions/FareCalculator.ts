import { getDistanceTimeService } from "../../services/maps.service";
import { ApiError } from "../api/ApiError";

// This function calculates the fare based on the distance
export async function getFareFunction(
  pickup: string,
  destination: string
): Promise<{ [key: string]: number }> {
  // Throw an error if pickup or destination is not provided
  if (!pickup || !destination) {
    throw new ApiError(400, "Pickup and destination are required");
  }

  // Get the distance and time from the maps service
  const { distance, duration } = await getDistanceTimeService(
    pickup,
    destination
  );

  // Calculate the base fare based on the vehicle type
  const baseFare = { car: 50, auto: 30, motorcycle: 20 };

  // Calculate the fare based on the distance per kilometer
  const perKilometerRate = { car: 15, auto: 10, motorcycle: 8 };

  // Calculate the fare based on the the time per minute
  const perMinuteRate = { car: 3, auto: 2, motorcycle: 1.5 };

  // Calculate the fare based on the distance, time and vehicle type
const fare = {
  auto:
    Math.round(
      (baseFare.auto +
        (distance.value / 1000) * perKilometerRate.auto +
        (duration.value / 60) * perMinuteRate.auto) *
        100
    ) / 100,

  car:
    Math.round(
      (baseFare.car +
        (distance.value / 1000) * perKilometerRate.car +
        (duration.value / 60) * perMinuteRate.car) *
        100
    ) / 100,

  motorcycle:
    Math.round(
      (baseFare.motorcycle +
        (distance.value / 1000) * perKilometerRate.motorcycle +
        (duration.value / 60) * perMinuteRate.motorcycle) *
        100
    ) / 100,
};

  // Return the fare object
  return fare;
}
