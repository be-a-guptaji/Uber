import { useState } from "react";
import { Link } from "react-router";

// Interface for User data
interface UserDataProps {
  email: string;
  password: string;
}

// User sign up component
const UserSignUp = () => {
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
            {/* Name Section */}
            <label htmlFor="firstName">
              <h3 className="text-xl mb-2 font-medium">
                What&apos;s your Name?
              </h3>
            </label>

            {/* First Name Section */}
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={email}
              onChange={(e) => handleEmail(e.target.value)}
              className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
            />

            {/* Last Name Section */}
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={email}
              onChange={(e) => handleEmail(e.target.value)}
              className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
            />

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

            {/* Login Button For Existing Captains */}
            <button className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-3 w-full">
              Login
            </button>
          </form>

          {/* Login Button For Existing Captains */}
          <p className="text-sm font-medium text-center">
            Join a fleet?
            <Link
              to={"/captain-signup"}
              className="font-semibold text-blue-600 ml-2"
            >
              Register as a Captain
            </Link>
          </p>
        </div>

        {/* Sign up container for new Captains */}
        <div className="w-full">
          {/* Sign up button for new Captains */}
          <Link
            to="/login"
            className="bg-[#10b461] text-white font-semibold mb-4 rounded px-4 py-3 w-full flex items-center justify-center"
          >
            Login as User
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserSignUp;
