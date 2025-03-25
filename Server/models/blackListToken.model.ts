import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the BlacklistToken document
interface BlacklistToken extends Document {
  token: string;
  createdAt: Date; // createdAt will be managed automatically by MongoDB if timestamps is true
}

// Define the schema for the BlacklistToken model
const blacklistTokenSchema = new Schema<BlacklistToken>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true, // Enable automatic creation of createdAt and updatedAt fields
    expires: 86400, // Set the expiration time for the token to 24 hours (86400 seconds)
  }
);

// Create the BlacklistToken model based on the schema
const BlacklistToken = mongoose.model<BlacklistToken>(
  "BlacklistToken",
  blacklistTokenSchema
);

// Export the model
export default BlacklistToken;
