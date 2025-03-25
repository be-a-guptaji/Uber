import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the interface for the captain document (model)
export interface CaptainSchemaType extends Document {
  fullName: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  socketId?: string;
  status: string;
  vehicle: {
    color: string;
    licencePlate: string;
    capacity: number;
    vehicleType: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };

  // Instance methods
  generateAuthToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

// Define the static methods for the Captain model
interface CaptainModel extends Model<CaptainSchemaType> {
  hashPassword(password: string): Promise<string>;
}

// Create the captain schema
const captainSchema = new Schema<CaptainSchemaType, CaptainModel>(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
        minlength: [2, "First name must be at least 2 characters long"],
      },
      lastName: {
        type: String,
        required: false, // You can set this as required if needed
        minlength: [2, "Last name must be at least 2 characters long"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: [6, "Email must be at least 6 characters long"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    vehicle: {
      color: {
        type: String,
        required: true,
        minlength: [2, "Color must be at least 2 characters long"],
      },
      licencePlate: {
        type: String,
        required: true,
        minlength: [6, "Licence plate must be at least 6 characters long"],
      },
      capacity: {
        type: Number,
        required: true,
        min: [1, "Capacity must be at least 1 person"],
      },
      vehicleType: {
        type: String,
        required: true,
        enum: ["car", "auto", "motorcycle"],
      },
    },
    location: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Static method to hash the password
captainSchema.statics.hashPassword = async function (
  password: string
): Promise<string> {
  // Hash the provided password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Return the hashed password
  return hashedPassword;
};

// Instance method to generate a JWT
captainSchema.methods.generateAuthToken = function (): string {
  // Generating JWT token using the secret key and captain ID
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "24h",
  });
  // Return the token
  return token;
};

// Instance method to compare password
captainSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  // Compare the provided password with the hashed password
  const isMatch = await bcrypt.compare(password, this.password);
  // Return the result
  return isMatch;
};

// Create the Captain model based on the schema
const Captain = mongoose.model<CaptainSchemaType, CaptainModel>(
  "Captain",
  captainSchema
);

// Export the Captain model
export default Captain;
