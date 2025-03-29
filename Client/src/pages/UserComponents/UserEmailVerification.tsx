import { useNavigate } from "react-router";
import VerificationCode from "../../components/VerificationCode";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../contexts/UserContext";
import Loading from "../Loading";
import { UserType } from "../../library/types";
import { createUser } from "../../services/Post/UserPostAPI";

// Types for the UserEmailVerification component
type UserEmailVerificationProps = UserType & { verificationCode: string };

// User email verification Component
const UserEmailVerification = () => {
  // Navigation hook
  const navigate = useNavigate();

  // State variables for form fields and data
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Show loading
  const [error, setError] = useState<boolean>(false); // Error message

  // Context variables and functions
  const { user, setUser } = useContext(UserDataContext)!;

  // Handle form submission
  const handleSubmit = async () => {
    if (user) {
      // Create the newUser object by spreading User data and adding the verificationCode
      const newUser: UserEmailVerificationProps = {
        fullName: {
          firstName: user.fullName.firstName,
          lastName: user.fullName?.lastName, // Optional chaining for lastName
        },
        email: user.email,
        password: user.password,
        verificationCode,
      };

      try {
        // Set loading to true
        setLoading(true);

        // Save User data to database
        const res = await createUser(newUser);

        // If User is saved successfully, set User data in context and navigate to home page
        setUser(res.data);
        navigate("/user/home");
      } catch {
        // Handle error and display specific error messages
        setError(true);
      } finally {
        // Set loading to false
        setLoading(false);
      }
    }
  };

  // If User is not logged in, navigate to login page
  useEffect(() => {
    // Check if User started the login process
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      {user ? (
        <>
          <VerificationCode
            firstName={user.fullName.firstName}
            email={user.email}
            verificationCode={verificationCode}
            loading={loading}
            setVerificationCode={setVerificationCode}
            handleSubmit={handleSubmit}
          />
          {/* Error Message For Invalid Email */}
          {error && (
            <p className="text-red-600 -mt-8 text-[12px] text-center">
              Invalid Verification Code
            </p>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UserEmailVerification;
