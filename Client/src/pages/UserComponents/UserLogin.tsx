import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { LoginDataType } from "../../library/types";
import { UserDataContext } from "../../contexts/UserContext";
import { loginUser } from "../../services/Post/UserPostAPI";

// User login component
const UserLogin = () => {
  // Navigation hook
  const navigate = useNavigate();

  // State variables for form fields and data
  const [email, setEmail] = useState<string>(""); // User email
  const [password, setPassword] = useState<string>(""); // User password
  const [error, setError] = useState<boolean>(false); // Show error

  // Context variables and functions
  const { setUser } = useContext(UserDataContext)!;

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
      // Retrieve User data
      const res = await loginUser(loginData);

      // If User is logged in successfully, set User data in context and navigate to home page
      setUser(res.data);
      navigate("/user/home");
    } catch {
      // Handle error silently, no alert or console log
      setError(true);
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
          <img src="./Uber.png" className="w-48" alt="Uber Logo" />
          {/* Form for User login */}
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

            {/* Login Button For Existing Users */}
            <button className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-3 w-full">
              Login
            </button>
          </form>

          {/* Login Button For Existing Users */}
          <p className="text-sm font-medium text-center mb-8">
            New to Uber?
            <Link to={"/signup"} className="font-semibold text-blue-600 ml-2">
              Create a New User Account
            </Link>
          </p>
        </div>

        {/* Sign up container for new Captains */}
        <div className="w-full">
          {/* Sign up button for new Captains */}
          <Link
            to="/captain-login"
            className="bg-[#f3c164] text-white font-semibold mb-4 rounded px-4 py-3 w-full flex items-center justify-center"
          >
            Log in as Captain
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
