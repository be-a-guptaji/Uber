import { useContext, useEffect } from "react";
import { UserDataContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import { getUser } from "../../services/Get/UserGetAPI";
import Loading from "../Loading";

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
      try {
        // Retrieve User data
        const res = await getUser();

        // If User is retrieved successfully, set User data in context and navigate to home page
        setUser(res.data);
      } catch {
        // Handle error silently, no alert or console log
        navigate("/login");
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
