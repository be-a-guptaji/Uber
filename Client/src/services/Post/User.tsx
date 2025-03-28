import { UserApiSuccess, UserType } from "../../library/types"; // Import the types
import { Api } from "../axios"; // Assuming you're using an Axios instance

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
