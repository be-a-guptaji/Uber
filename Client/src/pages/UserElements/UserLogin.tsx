import { useState } from "react";
import { Link } from "react-router";

// Interface for User data
interface UserDataProps {
  email: string;
  password: string;
}

// User login component
const UserLogin = () => {
  const [email, setEmail] = useState<string>(""); // User email
  const [password, setPassword] = useState<string>(""); // User password
  const [userData, setUserData] = useState<UserDataProps | null>(null); // User data

  // Handle email change
  const handleEmail = (email: string) => {
    setEmail(email);
  };

  // Handle password change
  const handlePassword = (password: string) => {
    setPassword(password);
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from submitting

    // Setting User Data
    setUserData({
      email: email,
      password: password,
    });

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
              onChange={(e) => handleEmail(e.target.value)}
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
              value={password}
              onChange={(e) => handlePassword(e.target.value)}
              className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
            />

            {/* Login Button For Existing Users */}
            <button className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-3 w-full">
              Login
            </button>
          </form>

          {/* Login Button For Existing Users */}
          <p className="text-sm font-medium text-center">
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
