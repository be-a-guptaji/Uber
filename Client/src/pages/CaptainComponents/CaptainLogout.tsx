import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { logoutCaptain } from "../../services/Get/CaptainGetAPI";
import { CaptainDataContext } from "../../contexts/CaptainDataContext";

// Cptain Logout component
const CaptainLogout = () => {
  // Navigation hook
  const navigate = useNavigate();

  // State variables for error
  const [error, setError] = useState<boolean>(false);

  // Context variables and functions
  const { setCaptain } = useContext(CaptainDataContext)!;

  // Handle logout
  const handleLogout = async () => {
    try {
      // Retrieve Captain data
      await logoutCaptain();

      // If Captain is logged out successfully, set Captain data in context and navigate to login page
      setCaptain(null);

      // Navigate to login page
      navigate("/captain-login");
    } catch {
      // Handle error silently, no alert or console log
      setError(true);
    }
  };

  return (
    <>
      <p>Captain log out</p>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <Link to="/user/home">jome</Link>
      {/* Error Message for logout failure */}
      {error && (
        <p className="text-red-600 text-[12px] text-center">
          Logout failed. Please try again.
        </p>
      )}
      <Outlet />
    </>
  );
};

export default CaptainLogout;
