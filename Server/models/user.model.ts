import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define interface for the user document (model)
interface UserSchemaType extends Document {
  fullName: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  socketId?: string;
}

// Create the user schema
const userSchema = new Schema<UserSchemaType>({
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
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

// This funtion is used to generate a JWT token for the user for authentication
userSchema.methods.generateAuthToken = function (): string {
  // Generate a JWT token using the user's ID and the secret key
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY!);
  // Return the generated token
  return token;
};

// This function is used to compare the user's password with the hashed password in the database
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  // Compare the user's password with the hashed password
  const isMatch = await bcrypt.compare(password, this.password);
  // Return the result of the comparison in the form of a boolean
  return isMatch;
};

// This middleware function is used to hash the user's password before saving it to the database
userSchema.statics.hashPassword = async function (
  password: string
): Promise<string> {
  // Hash the user's password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);
  // Return the hashed password
  return hashedPassword;
};

// Create and export the User model based on the schema
const User = mongoose.model<UserSchemaType>("User", userSchema);

// Export the User model
export default User;
