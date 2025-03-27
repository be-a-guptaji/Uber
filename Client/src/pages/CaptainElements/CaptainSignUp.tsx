import { useState } from "react";
import { CaptainType } from "../../library/types";
import { Link } from "react-router";

const CaptainSignUp = () => {
  const [firstName, setFirstName] = useState<string>(""); // Captain first name
  const [lastName, setLastName] = useState<string>(""); // Captain last name
  const [email, setEmail] = useState<string>(""); // Captain email
  const [password, setPassword] = useState<string>(""); // Captain password
  const [vehicleColor, setVehicleColor] = useState<string>(""); // Captain vehicle color
  const [vehicleLicencePlate, setVehicleLicencePlate] = useState<string>(""); // Captain vehicle licence plate
  const [vehicleCapacity, setVehicleCapacity] = useState<number>(1); // Captain vehicle capacity
  const [vehicleType, setVehicleType] = useState<string>(""); // Captain vehicle type
  const [captainData, setCaptainData] = useState<CaptainType | null>(null); // Captain data

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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from submitting

    // Setting Captain Data
    setCaptainData({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        licencePlate: vehicleLicencePlate,
        capacity: vehicleCapacity,
        vehicleType,
      },
    });

    // Reset form fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehicleLicencePlate("");
    setVehicleCapacity(1);
    setVehicleType("");
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
                What&apos;s our Captain&apos;s Name?
              </h3>
            </label>

            <div className="flex justify-between w-full">
              {/* First Name Section */}
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => handleFirstName(e.target.value)}
                className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-[45%] text-lg placeholder:text-base"
                required
              />

              {/* Last Name Section */}
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => handleLastName(e.target.value)}
                className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-[45%] text-lg placeholder:text-base"
                required
              />
            </div>

            {/* Email Section */}
            <label htmlFor="email">
              <h3 className="text-xl mb-2 font-medium">
                What&apos;s our Captain&apos;s email?
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

            {/* Sign Up Button For New Captains */}
            <button className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-3 w-full">
              Sign Up
            </button>
          </form>

          {/* Link Button For Creating New Users */}
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

          {/* Footer Section and Privacy Policy */}
          <div className="w-full">
            <p className="text-[10px] mt-6 leading-tight">
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

export default CaptainSignUp;
