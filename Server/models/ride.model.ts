import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the ride document (model)
export interface RideSchemaType extends Document {
  user: Schema.Types.ObjectId; // Correct type for ObjectId
  captain?: Schema.Types.ObjectId; // Optional, correct type for ObjectId
  pickup: string;
  destination: string;
  fare: number;
  status: "pending" | "accepted" | "completed" | "cancelled" | "ongoing";
  duration?: number;
  distance?: number;
  paymentID?: string;
  orderID?: string;
  signature?: string;
}

// Create the ride schema
const rideSchema = new Schema<RideSchemaType>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Captain",
    },
    pickup: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "completed", "cancelled", "ongoing"],
      default: "pending",
    },
    duration: {
      type: Number,
    },
    distance: {
      type: Number,
    },
    paymentID: {
      type: String,
    },
    orderID: {
      type: String,
    },
    signature: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Ride model based on the schema
const Ride = mongoose.model<RideSchemaType>("Ride", rideSchema);

// Export the Ride model
export default Ride;
