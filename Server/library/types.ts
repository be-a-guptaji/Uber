// Define the type for the FullName
export type FullNameType = {
  firstName: string;
  lastName?: string;
};

// Define the type for the Vehicle
export type VehicleType = {
  color: string;
  licencePlate: string;
  capacity: number;
  vehicleType: "car" | "auto" | "motorcycle";
};

// Define the type for the Location
export type LocationType = {
  latitude: number;
  longitude: number;
};

// Define the type for the User
export type UserType = {
  fullName: FullNameType;
  email: string;
  password: string;
  socketId?: string;
};

// Define the type for the Captain
export type CaptainType = {
  vehicle: VehicleType;
} & UserType;

// Define the type for the Coordinates
export type CoordinatesType = { ltd: number; lng: number };

// Define the type for the Distance and Time
export type DistanceTimeType = {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  status: string;
};

// Define the type for the Ride
export type RideType = {
  user: string;
  pickup: string;
  destination: string;
  vehicleType: "car" | "auto" | "motorcycle";
};
