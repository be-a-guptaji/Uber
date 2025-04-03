import { Link } from "react-router";

// Landing page component for the application
const Start = () => {
  return (
    <>
      {/* Background image */}
      <div className="bg-cover bg-center bg-[url('./HomePageBackgroundImage.jpg')] h-dvh w-full flex justify-between flex-col pt-4">
        {/* Logo */}
        <img src="/Uber.png" className="w-48 ml-4 invert" alt="Uber Logo" />
        {/* Footer */}
        <div className="bg-white p-4 pb-7">
          {/* Heading */}
          <h2 className="text-3xl font-bold w-full text-center">
            Get Started with Uber
          </h2>
          {/* Link to the login page */}
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </>
  );
};

export default Start;
