import { useNavigate } from "react-router";
import VerificationCode from "../../components/VerificationCode";
import { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../../contexts/CaptainContext";
import Loading from "../Loading";
import { CaptainType } from "../../library/types";
import { createCaptain } from "../../services/Post/CaptainPostAPI";

// Types for the CaptainEmailVerification component
type CaptainEmailVerificationProps = CaptainType & { verificationCode: string };

// Captain email verification Component
const CaptainEmailVerification = () => {
  // Navigation hook
  const navigate = useNavigate();

  // State variables for form fields and data
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Show loading
  const [error, setError] = useState<boolean>(false); // Error message

  // Context variables and functions
  const { captain, setCaptain } = useContext(CaptainDataContext)!;

  // Handle form submission
  const handleSubmit = async () => {
    if (captain) {
      // Create the newCaptain object by spreading Captain data and adding the verificationCode
      const newCaptain: CaptainEmailVerificationProps = {
        fullName: {
          firstName: captain.fullName.firstName,
          lastName: captain.fullName?.lastName, // Optional chaining for lastName
        },
        email: captain.email,
        password: captain.password,
        vehicle: captain.vehicle,
        verificationCode,
      };

      try {
        // Set loading to true
        setLoading(true);

        // Save Captain data to database
        const res = await createCaptain(newCaptain);

        // If Captain is saved successfully, set Captain data in context and navigate to home page
        setCaptain(res.data);
        navigate("/captain/home");
      } catch {
        // Handle error and display specific error messages
        setError(true);
      } finally {
        // Set loading to false
        setLoading(false);
      }
    }
  };

  // If Captain is not logged in, navigate to login page
  useEffect(() => {
    // Check if Captain started the login process
    if (!captain) {
      navigate("/");
    }
  }, [captain, navigate]);

  return (
    <>
      {captain ? (
        <>
          <VerificationCode
            firstName={captain.fullName.firstName}
            email={captain.email}
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

export default CaptainEmailVerification;
