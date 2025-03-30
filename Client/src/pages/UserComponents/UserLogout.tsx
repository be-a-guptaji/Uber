import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { UserDataContext } from "../../contexts/UserContext";
import { logoutUser } from "../../services/Get/UserGetAPI";

// User Logout component
const UserLogout = () => {
  // Navigation hook
  const navigate = useNavigate();

  // State variables for error
  const [error, setError] = useState<boolean>(false);

  // Context variables and functions
  const { setUser } = useContext(UserDataContext)!;

  // Handle logout
  const handleLogout = async () => {
    try {
      // Retrieve user data
      await logoutUser();

      // If user is logged out successfully, set user data in context and navigate to login page
      setUser(null);

      // Navigate to login page
      navigate("/login");
    } catch {
      // Handle error silently, no alert or console log
      setError(true);
    }
  };

  return (
    <>
      <p>user log out</p>
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

export default UserLogout;
