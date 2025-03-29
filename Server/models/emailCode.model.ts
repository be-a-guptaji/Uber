import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Define the interface for the EmailCode document
export interface EmailCodeType extends Document {
  email: string;
  verificationCode: string;
  usage: "verificationCode" | "deleteAccount" | "resetPassword";

  // Instance methods
  compareCode(code: string): Promise<boolean>;
}

// Define the static methods for the EmailCode model
interface EmailCodeModel extends Model<EmailCodeType> {
  hashCode(code: string): Promise<string>;
}

// Define the schema for the EmailCode model
const emailCodeSchema = new Schema<EmailCodeType>(
  {
    email: {
      type: String,
      required: true,
    },
    verificationCode: {
      type: String,
      required: true,
    },
    usage: {
      type: String,
      required: true,
      default: "verificationCode",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Set the expiration time for the createdAt field to 5 minutes (300 seconds)
emailCodeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

// Static method to hash the verification code
emailCodeSchema.statics.hashCode = async function (
  code: string
): Promise<string> {
  // Hash the provided verification code
  const hashedCode = await bcrypt.hash(code, 10);
  // Return the hashed verification code
  return hashedCode;
};

// Instance method to compare verification code
emailCodeSchema.methods.compareCode = async function (
  code: string
): Promise<boolean> {
  // Compare the provided code with the hashed verification code
  const isMatch = await bcrypt.compare(code, this.verificationCode);
  // Return the result
  return isMatch;
};

// Create the EmailCode model based on the schema
const EmailCode = mongoose.model<EmailCodeType, EmailCodeModel>(
  "EmailCode",
  emailCodeSchema
);

// Export the model
export default EmailCode;
