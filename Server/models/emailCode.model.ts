// import mongoose, { Document, Schema } from "mongoose";

// // Define the interface for the EmailCode document
// expoport interface EmailCodeType extends Document {
//   email: string;
//   verificationCode: string;
//   case: "verificationCode" | "deleteAccount" | "resetPassword";
// }

// // Define the schema for the EmailCode model
// const emailCodeSchema = new Schema<EmailCodeType>(
//   {
//     email: {
//       type: String,
//       required: true,
//     },
//     verificationCode: {
//       type: String,
//       required: true,
//     },
//     case: {
//       type: String,
//       required: true,
//       default: "verificationCode",
//     },
//   },
//   {
//     timestamps: true,
//     expireAfterSeconds: 300,
//     expires: 300,
//   }
// );

// // Set the expiration time for the createdAt field to 5 minutes (300 seconds)
// emailCodeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

// // Create the EmailCode model based on the schema
// const EmailCode = mongoose.model<EmailCodeType>("EmailCode", emailCodeSchema);

// // Export the model
// export default EmailCode;

import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the EmailCode document
export interface EmailCodeType extends Document {
  email: string;
  verificationCode: string;
  case: "verificationCode" | "deleteAccount" | "resetPassword";
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
    case: {
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

// Create the EmailCode model based on the schema
const EmailCode = mongoose.model<EmailCodeType>("EmailCode", emailCodeSchema);

// Export the model
export default EmailCode;
