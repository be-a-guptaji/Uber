import {
  CaptainApiSuccess,
  CaptainType,
  UserApiSuccess,
  UserType,
} from "../../library/types";
import { Api } from "../axios";

// Api call to create a new User in the database
export const sendEmailVerificationCodeForUser = async (
  newUser: UserType
): Promise<UserApiSuccess> => {
  const response = await Api.post("/emails/user", newUser, {
    withCredentials: true,
  });

  // The API response is typed as UserApiSuccess
  const data: UserApiSuccess = response.data;

  // Return the full response data
  return data;
};

// Api call to create a new Captain in the database
export const sendEmailVerificationCodeForCaptain = async (
  newCaptain: CaptainType
): Promise<CaptainApiSuccess> => {
  const response = await Api.post("/emails/captain", newCaptain, {
    withCredentials: true,
  });

  // The API response is typed as CaptainApiSuccess
  const data: CaptainApiSuccess = response.data;

  // Return the full response data
  return data;
};
