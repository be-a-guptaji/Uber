import { useNavigate } from "react-router";

// Type for FinishRide
type FinishRideType = {
  setFinishRidePanel: (value: boolean) => void;
  ride: unknown;
};

// Component for FinishRide
const FinishRide = ({ setFinishRidePanel }: FinishRideType) => {
  // Navigation hook();
  const navigate = useNavigate();

  // Function to end the ride
  async function endRide() {
    // const response = await axios.post(
    //   `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
    //   {
    //     rideId: props.ride._id,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   }
    // );

    // if (response.status === 200) {
    navigate("/captain/home");
    // }
  }

  return (
    <>
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold my-4">Finish this Ride</h3>
        <button onClick={() => setFinishRidePanel(false)}>
          <i className="ri-arrow-down-s-line text-3xl" />
        </button>
      </div>

      <div className="flex items-center justify-between p-4 border-2 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {/* {ride?.user.fullname.firstname} */}
            Aryan Baadlas
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {/* {ride?.pickup} */}
                fafe
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {/* {ride?.destination} */}ffawefwe
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">
                {/* ₹{ride?.fare} */}
                234231
              </h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-10 w-full">
          <button
            onClick={endRide}
            className="w-full mt-5 flex  text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
          >
            Finish Ride
          </button>
        </div>
      </div>
    </>
  );
};

export default FinishRide;
