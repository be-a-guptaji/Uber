import { UserApiSuccess } from "../../library/types";
import { Api } from "../axios";

// Api call to get User data
export const getUser = async (): Promise<UserApiSuccess> => {
  const response = await Api.get("/users/profile", { withCredentials: true });

  // The API response is typed as UserApiSuccess
  const data: UserApiSuccess = response.data;

  // Return the full response data
  return data;
};

// Api call to logout a User
export const logoutUser = async (): Promise<void> => {
  await Api.get("/users/logout", { withCredentials: true });
};
