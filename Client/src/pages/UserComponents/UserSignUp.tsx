import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserType } from "../../library/types";
import { UserDataContext } from "../../contexts/UserContext";
import { sendEmailVerificationCodeForUser } from "../../services/Post/EmailPostAPI";

// User sign up component
const UserSignUp = () => {
  // Navigation hook
  const navigate = useNavigate();

  // State variables for form fields and data
  const [firstName, setFirstName] = useState<string>(""); // User first name
  const [lastName, setLastName] = useState<string>(""); // User last name
  const [email, setEmail] = useState<string>(""); // User email
  const [password, setPassword] = useState<string>(""); // User password
  const [loading, setLoading] = useState<boolean>(false); // Show loading
  const [error, setError] = useState<boolean>(false); // Show error

  // Context variables and functions
  const { setUser } = useContext(UserDataContext)!;

  // Handle first name change
  const handleFirstName = (firstName: string) => {
    setFirstName(firstName);
  };

  // Handle last name change
  const handleLastName = (lastName: string) => {
    setLastName(lastName);
  };

  // Handle email change
  const handleEmail = (email: string) => {
    setEmail(email);
  };

  // Handle password change
  const handlePassword = (password: string) => {
    setPassword(password);
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from submitting

    // Setting User Data
    const newUser: UserType = {
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
    };

    try {
      // Set loading to true
      setLoading(true);

      // Send email verification code for User
      await sendEmailVerificationCodeForUser(newUser);

      // If User is saved successfully, set User data in context and navigate to email verification page
      setUser(newUser);

      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");

      // Navigate to email verification page
      navigate("/email/user");
    } catch {
      // Handle error silently, no alert or console log
      setError(true);
    } finally {
      // Set loading to false
      setLoading(false);
    }
  };

  return (
    <>
      {/* Login form */}
      <div className="p-8 h-dvh flex flex-col items-center justify-between">
        {/* Login form container */}
        <div className="w-full">
          {/* Logo */}
          <img src="/Uber.png" className="w-48" alt="Uber Logo" />
          {/* Form for User login */}
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
            {/* Name Section */}
            <div className="flex flex-col relative">
              <label htmlFor="firstName">
                <h3 className="text-xl mb-2 font-medium">
                  What&apos;s your Name?
                </h3>
              </label>
              <div className="flex justify-between w-full">
                {/* First Name Section */}
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    handleFirstName(e.target.value);
                  }}
                  className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-[45%] text-lg placeholder:text-base"
                  required
                />
                {/* Error Message For Invalid First Name */}
                {error && firstName.length < 2 && (
                  <p className="text-red-600 -mt-8 text-[12px] text-center absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full">
                    First name must be at least 2 characters long
                  </p>
                )}

                {/* Last Name Section */}
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    handleLastName(e.target.value);
                  }}
                  className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-[45%] text-lg placeholder:text-base"
                />
              </div>
            </div>
            {/* Email Section */}
            <label htmlFor="email">
              <h3 className="text-xl mb-2 font-medium">
                What&apos;s your email?
              </h3>
            </label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                handleEmail(e.target.value);
              }}
              className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
            />
            {/* Error Message For Invalid Email */}
            {error && password.length >= 6 && firstName.length >= 2 && (
              <p className="text-red-600 -mt-8 text-[12px] text-center">
                Either email is already in use or invalid.
              </p>
            )}
            {/* Password Section */}
            <label htmlFor="password">
              <h3 className="text-xl mb-2 font-medium">Enter Password</h3>
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              autoComplete="off"
              value={password}
              onChange={(e) => {
                handlePassword(e.target.value);
              }}
              className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
            />
            {/* Error Message For Invalid Password */}
            {error && password.length < 6 && (
              <p className="text-red-600 -mt-8 text-[12px] text-center mb-3.5">
                Password must be at least 6 characters long.
              </p>
            )}
            {/* Sign Up Button For New Captains */}
            <button
              className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-3 w-full disabled:opacity-50"
              disabled={loading}
            >
              Verify Email
            </button>
          </form>

          {/* Link Button For Creating New Captains */}
          <p className="text-sm font-medium text-center mb-8">
            Join a fleet?
            <Link
              to={"/captain-signup"}
              className="font-semibold text-blue-600 ml-2"
            >
              Register as a Captain
            </Link>
          </p>
        </div>

        {/* Sign up container for New User */}
        <div className="w-full">
          {/* Sign up button for New User */}
          <Link
            to="/login"
            className="bg-[#10b461] text-white font-semibold mb-4 rounded px-4 py-3 w-full flex items-center justify-center"
          >
            Log in as User
          </Link>

          {/* Footer Section and Privacy Policy */}
          <div className="w-full">
            <p className="text-[10px] leading-tight">
              This site is protected by reCAPTCHA and the{" "}
              <span className="underline">Google Privacy Policy</span> and{" "}
              <span className="underline">Terms of Service apply</span>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignUp;
