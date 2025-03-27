import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { FullNameType } from "../library/types";

// Define the interface for the user document (model)
export interface UserSchemaType extends Document {
  fullName: FullNameType;
  email: string;
  password: string;
  socketId?: string;

  // Instance methods
  generateAuthToken(): string;
  comparePassword(password: string): Promise<boolean>;
}

// Define the static methods for the User model
interface UserModel extends Model<UserSchemaType> {
  hashPassword(password: string): Promise<string>;
}

// Create the user schema
const userSchema = new Schema<UserSchemaType, UserModel>(
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
  },
  {
    timestamps: true,
  }
);

// Static method to hash the password
userSchema.statics.hashPassword = async function (
  password: string
): Promise<string> {
  // Hash the provided password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Return the hashed password
  return hashedPassword;
};

// Instance method to generate a JWT
userSchema.methods.generateAuthToken = function (): string {
  // Generating JWT token using the secret key and user ID
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "24h",
  });
  // Return the token
  return token;
};

// Instance method to compare password
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  // Compare the provided password with the hashed password
  const isMatch = await bcrypt.compare(password, this.password);
  // Return the result
  return isMatch;
};

// Create the User model based on the schema
const User = mongoose.model<UserSchemaType, UserModel>("User", userSchema);

// Export the User model
export default User;
