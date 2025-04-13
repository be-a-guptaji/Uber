import { useContext, useEffect } from "react";
import { UserDataContext } from "../../contextsProviders/UserContextProvider";
import { useNavigate } from "react-router";
import { getUser } from "../../services/Get/UserGetAPI";
import Loading from "../../components/Loading";
import { UserApiSuccess } from "../../library/types";

// Define the props for the component
interface ProtectedUserComponentWrapperProps {
  children: React.ReactNode;
}

// ProtectedUserComponentWrapper component for the application to protect User routes from unauthorized access
const ProtectedUserComponentWrapper = ({
  children,
}: ProtectedUserComponentWrapperProps) => {
  // Navigation hook
  const navigate = useNavigate();

  // Context variables and functions
  const { user, setUser } = useContext(UserDataContext)!;

  // If User is not logged in, navigate to login page
  useEffect(() => {
    // Function to get User profile
    const getUserProfile = async () => {
      // Variable to store User data
      let res: UserApiSuccess = {
        statusCode: 0,
        message: "",
        data: null,
        success: false,
      };

      try {
        // Retrieve User data
        res = await getUser();

        // If User is retrieved successfully, set User data in context and navigate to home page
        if (res.data) {
          setUser(res.data);
        }
      } catch {
        // If User is not logged in, navigate to login page
        if (!res.data) {
          navigate("/login");
        }
      }
    };

    // Check if User is logged in
    if (!user) {
      // If User is not logged in, navigate to login page
      getUserProfile();
    }
  }, [user, navigate, setUser]); // Only re-run effect if getUserProfile changes

  return <>{user ? children : <Loading />}</>;
};

export default ProtectedUserComponentWrapper;
