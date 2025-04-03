// Define the props type
type ConfirmRidePopUpProps = {
  setRidePopupPanel: (open: boolean) => void;
  setConfirmRidePopupPanel: (open: boolean) => void;
};

// Define the ConfirmRidePopUp component
const ConfirmRidePopUp = ({
  setRidePopupPanel,
  setConfirmRidePopupPanel,
}: ConfirmRidePopUpProps) => {
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

          {/* Confirm button */}
          <button
            className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg text-xl"
            onClick={() => {
              setConfirmRidePopupPanel(false);
            }}
          >
            Confirm
          </button>

          {/* Cancel button */}
          <button
            className="w-full bg-red-600 text-white font-semibold p-2 rounded-lg text-xl"
            onClick={() => {
              setConfirmRidePopupPanel(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmRidePopUp;
