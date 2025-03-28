import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { LoginDataType } from "../../library/types";
import { CaptainDataContext } from "../../contexts/CaptainContext";
import { loginCaptain } from "../../services/Post/CaptainPostAPI";

// Captain login component
const CaptainLogin = () => {
  // Navigation hook
  const navigate = useNavigate();

  // State variables for form fields and data
  const [email, setEmail] = useState<string>(""); // Captain email
  const [password, setPassword] = useState<string>(""); // Captain password
  const [loading, setLoading] = useState<boolean>(false); // Show loading
  const [error, setError] = useState<boolean>(false); // Show error

  // Context variables and functions
  const { setCaptain } = useContext(CaptainDataContext)!;

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

    // Setting login Data
    const loginData: LoginDataType = {
      email,
      password,
    };

    try {
      // Set loading to true
      setLoading(true);

      // Retrieve Captain data
      const res = await loginCaptain(loginData);

      // If Captain is logged in successfully, set Captain data in context and navigate to home page
      setCaptain(res.data);
      navigate("/captain/home");
    } catch {
      // Handle error silently, no alert or console log
      setError(true);
    } finally {
      // Set loading to false
      setLoading(false);
    }

    // Reset form fields
    setEmail("");
    setPassword("");
  };

  return (
    <>
      {/* Login form */}
      <div className="p-8 h-dvh flex flex-col items-center justify-between">
        {/* Login form container */}
        <div className="w-full">
          {/* Logo */}
          <img
            src="./UberCaptain.webp"
            className="invert w-48"
            alt="Uber Captain Logo"
          />
          {/* Form for Captain login */}
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
          >
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
            {/* Error Message for invalid email or password */}
            {error && (
              <p className="text-red-600 -mt-8 text-[12px] text-center mb-3.5">
                Invalid email or password
              </p>
            )}

            {/* Login Button For Existing Captains */}
            <button
              className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-3 w-full disabled:opacity-50"
              disabled={loading}
            >
              Login
            </button>
          </form>

          {/* Login Button For Existing Captains */}
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
        </div>
      </div>
    </>
  );
};

export default CaptainLogin;
