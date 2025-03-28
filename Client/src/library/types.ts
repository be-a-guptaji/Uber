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

// Define the type for the Schema Additions from Mongoose database
export type SchemaAdditions = {
  _id: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
};

// Define the type for the Api success for Captain
export type CaptainApiSuccess = {
  statusCode: number;
  data: { captain: CaptainType & SchemaAdditions } | null;
  message: string;
  success: boolean;
};

// Define the type for the Api success for User
export type UserApiSuccess = {
  statusCode: number;
  data: { user: UserType & SchemaAdditions } | null;
  message: string;
  success: boolean;
};
