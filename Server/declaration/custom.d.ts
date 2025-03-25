import { UserSchemaType } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: UserSchemaType; // Add the user property (or use the appropriate type)
    }
  }
}
