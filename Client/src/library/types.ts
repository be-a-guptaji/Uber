// Define the type for the login data
export type LoginDataType = {
  email: string;
  password: string;
};

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
  vehicleType: string;
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