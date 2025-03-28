import { LoginDataType, UserApiSuccess, UserType } from "../../library/types";
import { Api } from "../axios";

// Api call to create a new User in the database
export const createUser = async (
  newUser: UserType
): Promise<UserApiSuccess> => {
  const response = await Api.post("/users/register", newUser, {
    withCredentials: true,
  });

  // The API response is typed as UserApiSuccess
  const data: UserApiSuccess = response.data;

  // Return the full response data
  return data;
};

// Api call to login a User
export const loginUser = async (
  loginData: LoginDataType
): Promise<UserApiSuccess> => {
  const response = await Api.post("/users/login", loginData, {
    withCredentials: true,
  });

  // The API response is typed as UserApiSuccess
  const data: UserApiSuccess = response.data;

  // Return the full response data
  return data;
};
