import { useState } from "react";
import { Link } from "react-router";

// Define the props type
type ConfirmRidePopUpProps = {
  setConfirmRidePopupPanel: (open: boolean) => void;
};

// Define the ConfirmRidePopUp component
const ConfirmRidePopUp = ({
  setConfirmRidePopupPanel,
}: ConfirmRidePopUpProps) => {
  // State Variables
  const [otp, setOtp] = useState<string>(); // OTP state
  const [error, setError] = useState<boolean>(false); // Error state

  // Function to handle OTP input
  const handleOTP = (value: string) => {
    if (value.length <= 6) {
      setOtp(value); // Set OTP value
    }
  };

  // Function to handle form submission
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setError(false); // Reset error state

    // Reset OTP
    setOtp(""); // Clear OTP input
  };

  return (
    <>
      <div className="h-dvh py-8">
        {/* Heading */}
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold my-4">
            Confirm Ride to get Started
          </h3>
          <button
            onClick={() => {
              setConfirmRidePopupPanel(false);
            }}
          >
            <i className="ri-arrow-down-s-line text-3xl" />
          </button>
        </div>

        {/* Customer Details */}
        <div className="flex items-center justify-between gap-4 p-4 mb-4 bg-yellow-400 rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1742201835989-4e346e36b364?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="User Pfp"
            className="size-14 rounded-full"
          />
          <h4 className="text-xl font-medium">Aryan Baadlas</h4>
          <h5 className="text-lg font-medium">23.45 KM</h5>
        </div>

        {/* Details Section */}
        <div className="flex flex-col items-center justify-center w-full gap-4">
          {/* Pickup point , dropoff point and fair */}
          <div className="w-full divide-y flex flex-col gap-4">
            {/* Pickup point */}
            <div className="flex items-center gap-8 justify-start w-full pb-4">
              <i className="ri-map-pin-2-fill text-3xl bg-[#eee] p-3 rounded-full" />
              <div className="flex flex-col">
                <h3 className="font-bold text-xl">562/11-A</h3>
                <p className="text-gray-500 font-medium text-sm">
                  Jamna Par, New Delhi
                </p>
              </div>
            </div>

            {/* Dropoff point */}
            <div className="flex items-center gap-8 justify-start w-full pb-4">
              <i className="ri-map-pin-user-fill text-3xl bg-[#eee] p-3 rounded-full" />
              <div className="flex flex-col">
                <h3 className="font-bold text-xl">Shubash Park</h3>
                <p className="text-gray-500 font-medium text-sm">
                  Mg Road, Agra
                </p>
              </div>
            </div>

            {/* Fair */}
            <div className="flex items-center gap-8 justify-start w-full pb-4">
              <i className="ri-currency-line text-3xl bg-[#eee] p-3 rounded-full" />
              <div className="flex flex-col">
                <h3 className="font-bold text-xl">₹1234.45</h3>
                <p className="text-gray-500 font-medium text-sm">
                  Total Fair to pay
                </p>
              </div>
            </div>
          </div>

          <form
            className="flex flex-col gap-4 w-full mt-8"
            onSubmit={(e) => submitHandler(e)}
          >
            {/* OTP Section */}
            <label htmlFor="OTP">
              <h3 className="text-xl mb-2 font-medium text-center">
                Enter OTP
              </h3>
            </label>
            <input
              type="number"
              id="OTP"
              placeholder="Enter OTP"
              autoComplete="off"
              value={otp}
              maxLength={6}
              minLength={6}
              onChange={(e) => {
                handleOTP(e.target.value);
              }}
              className="bg-[#eeeeee] mb-8 rounded px-4 py-2 border w-full text-lg placeholder:text-base font-mono text-center tracking-widest"
              required
            />{" "}
            {/* Error Message For Invalid OTP */}
            {error && (
              <p className="text-red-600 -mt-8 text-[12px] text-center mb-3.5">
                OTP is Invalid
              </p>
            )}
            {/* Confirm button */}
            <Link
              to={`${otp?.length === 6 && "/captain/riding"}`}
              className={`w-full bg-green-600 text-white text-center font-semibold p-2 rounded-lg text-xl ${
                error ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              } ${otp?.length !== 6 && "opacity-50"}`}
              onClick={() => {
                if (otp?.length === 6) {
                  setConfirmRidePopupPanel(false);
                }
              }}
            >
              Confirm
            </Link>
            {/* Cancel button */}
            <button
              className="w-full bg-red-600 text-white font-semibold p-2 rounded-lg text-xl"
              onClick={() => {
                setConfirmRidePopupPanel(false);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConfirmRidePopUp;
