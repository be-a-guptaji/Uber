import {
  LoginDataType,
  CaptainApiSuccess,
  CaptainType,
} from "../../library/types";
import { Api } from "../axios";

// Api call to create a new Captain in the database
export const createCaptain = async (
  newCaptain: CaptainType
): Promise<CaptainApiSuccess> => {
  const response = await Api.post("/captains/register", newCaptain, {
    withCredentials: true,
  });

  // The API response is typed as CaptainApiSuccess
  const data: CaptainApiSuccess = response.data;

  // Return the full response data
  return data;
};

// Api call to login a Captain
export const loginCaptain = async (
  loginData: LoginDataType
): Promise<CaptainApiSuccess> => {
  const response = await Api.post("/captains/login", loginData, {
    withCredentials: true,
  });

  // The API response is typed as CaptainApiSuccess
  const data: CaptainApiSuccess = response.data;

  // Return the full response data
  return data;
};
