import { CaptainApiSuccess } from "../../library/types";
import { Api } from "../axios";

// Api call to get Captain data
export const getCaptain = async (): Promise<CaptainApiSuccess> => {
  const response = await Api.get("/captains/profile", {
    withCredentials: true,
  });

  // The API response is typed as CaptainApiSuccess
  const data: CaptainApiSuccess = response.data;

  // Return the full response data
  return data;
};

// Api call to logout a Captain
export const logoutCaptain = async (): Promise<void> => {
  await Api.get("/captains/logout", { withCredentials: true });
};
