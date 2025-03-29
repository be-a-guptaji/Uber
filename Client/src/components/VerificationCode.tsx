import { useEffect, useRef } from "react";

// Types for the VerificationCode component
type VerificationCodeProps = {
  firstName: string;
  email: string;
  verificationCode: string;
  loading: boolean;
  setVerificationCode: (code: string) => void;
  handleSubmit: () => void;
};

// Define the VerificationCode component
const VerificationCode = ({
  firstName,
  email,
  verificationCode,
  loading,
  setVerificationCode,
  handleSubmit,
}: VerificationCodeProps) => {
  // Create a ref to store references to the input elements
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Function to handle input change
  const handleInputChange = (value: string) => {
    if (verificationCode.length > 5) {
      return; // Don't update if the verification code is complete or empty
    }

    // Update the verification code
    const newCode = [...verificationCode.split(""), value];
    setVerificationCode(newCode.join("")); // Directly set the new value
  };

  useEffect(() => {
    // Initialize the input references after the component mounts
    inputsRef.current = inputsRef.current.slice(0, 6);
  }, []);

  // Function to focus on a specific input
  const focusInput = (focusIndex: number) => {
    // Focus on the first input
    inputsRef.current[focusIndex]?.focus();
  };

  // Function to handle backspace keydown event
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      // Focus on the previous input
      focusInput(verificationCode.length - 1);
      setVerificationCode(verificationCode.slice(0, -1));
    }
  };

  useEffect(() => {
    // Focus on the first input when the verification code changes
    focusInput(verificationCode.length);
  }, [verificationCode]);

  return (
    <div className="h-dvh flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl">
        Hey!, <span className="font-bold text-blue-500">{firstName}</span>
      </h1>
      <p className="text-lg text-center my-8">
        Please check your email at{" "}
        <span className="font-bold text-amber-500">{email}</span> to verify your
        account and get started.
      </p>

      {/* Mapping over numbers and displaying them inside square boxes */}
      <div className="flex flex-wrap justify-center gap-2 my-8">
        {[0, 1, 2, 3, 4, 5].map((number) => (
          <input
            key={number}
            ref={(el) => {
              // Store the reference for each input
              inputsRef.current[number] = el;
            }}
            type="number"
            id={number.toString()}
            value={verificationCode[number] || ""}
            onChange={(e) => handleInputChange(e.target.value)}
            maxLength={1} // Ensure only one digit can be entered
            onKeyDown={(e) => {
              // Handle keydown event to move focus to the next input
              handleKeyDown(e);
            }}
            className="w-12 h-12 text-center flex items-center justify-center border border-gray-300 bg-blue-100 rounded-lg"
          />
        ))}
      </div>

      {/* Button for any action */}
      <button
        className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-3 w-full disabled:opacity-50"
        disabled={verificationCode.length !== 6 || loading}
        onClick={handleSubmit}
      >
        Verify Account
      </button>
    </div>
  );
};

export default VerificationCode;
