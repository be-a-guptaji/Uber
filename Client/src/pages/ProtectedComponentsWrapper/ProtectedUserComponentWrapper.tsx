import { useContext, useEffect } from "react";
import { UserDataContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import { getUser } from "../../services/Get/UserGetAPI";

// Define the props for the component
interface ProtectedUserComponentWrapperProps {
  children: React.ReactNode;
}

// ProtectedUserComponentWrapper component for the application to protect user routes from unauthorized access
const ProtectedUserComponentWrapper = ({
  children,
}: ProtectedUserComponentWrapperProps) => {
  // Navigation hook
  const navigate = useNavigate();

  // Context variables and functions
  const { user, setUser } = useContext(UserDataContext)!;

  // If user is not logged in, navigate to login page
  useEffect(() => {
    // Function to get user profile
    const getUserProfile = async () => {
      try {
        // Retrieve user data
        const res = await getUser();

        // If user is retrieved successfully, set user data in context and navigate to home page
        setUser(res.data);
      } catch {
        // Handle error silently, no alert or console log
        navigate("/login");
      }
    };

    // Check if user is logged in
    if (!user) {
      // If user is not logged in, navigate to login page
      getUserProfile();
    }
  }, [user, navigate, setUser]); // Only re-run effect if getUserProfile changes

  return <>{children}</>;
};

export default ProtectedUserComponentWrapper;
