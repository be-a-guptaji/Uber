import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { getCaptain } from "../../services/Get/CaptainGetAPI";
import Loading from "../../components/Loading";
import { CaptainApiSuccess } from "../../library/types";
import { CaptainDataContext } from "../../contexts/CaptainDataContext";

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
      // Variable to store Captain data
      let res: CaptainApiSuccess = {
        statusCode: 0,
        message: "",
        data: null,
        success: false,
      };

      try {
        // Retrieve Captain data
        res = await getCaptain();

        // If Captain is retrieved successfully, set Captain data in context and navigate to home page
        if (res.data) {
          setCaptain(res.data);
        }
      } catch {
        // If Captain is not logged in, navigate to login page
        if (!res.data) {
          navigate("/captain-login");
        }
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
