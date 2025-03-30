import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { CaptainDataContext } from "../../contexts/CaptainContext";
import { getCaptain } from "../../services/Get/CaptainGetAPI";
import Loading from "../Loading";

// Define the props for the component
interface ProtectedCaptainComponentWrapperProps {
  children: React.ReactNode;
}

// ProtectedCaptainComponentWrapper component for the application to protect Captain routes from unauthorized access
const ProtectedCaptainComponentWrapper = ({
  children,
}: ProtectedCaptainComponentWrapperProps) => {
  // Navigation hook
  const navigate = useNavigate();

  // Context variables and functions
  const { captain, setCaptain } = useContext(CaptainDataContext)!;

  // If Captain is not logged in, navigate to login page
  useEffect(() => {
    // Function to get Captain profile
    const getCaptainProfile = async () => {
      try {
        // Retrieve Captain data
        const res = await getCaptain();

        // If Captain is retrieved successfully, set Captain data in context and navigate to home page
        setCaptain(res.data);
      } catch {
        // Handle error silently, no alert or console log
        // If Captain is not logged in, navigate to login page
        navigate("/login");
      }
    };

    // Check if Captain is logged in
    if (!captain) {
      // If Captain is not logged in, navigate to login page
      getCaptainProfile();
    }
  }, [captain, navigate, setCaptain]); // Only re-run effect if getCaptainProfile changes

  return <> {captain ? children : <Loading />}</>;
};

export default ProtectedCaptainComponentWrapper;
