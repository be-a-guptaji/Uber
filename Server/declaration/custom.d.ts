import { CaptainSchemaType } from "../models/captain.model";
import { UserSchemaType } from "../models/user.model";

declare global {
  namespace Express {
    // Extend the request interface to include the User and Captain
    interface Request {
      user?: UserSchemaType;
      captain?: CaptainSchemaType;
    }
  }
}
