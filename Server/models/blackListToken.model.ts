import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the BlacklistToken document
interface BlacklistToken extends Document {
  token: string;
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
    timestamps: true,
    expireAfterSeconds: 86400,
    expires: 86400,
  }
);

// Set the expiration time for the createdAt field to 24 hours (86400 seconds)
blacklistTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

// Create the BlacklistToken model based on the schema
const BlacklistToken = mongoose.model<BlacklistToken>(
  "BlacklistToken",
  blacklistTokenSchema
);

// Export the model
export default BlacklistToken;
