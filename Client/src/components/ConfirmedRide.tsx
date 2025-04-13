import { createRide } from "../services/Post/RidePostAPI";

// Types for the ConfirmedRide component
type ConfirmedRideProps = {
  fare: { [key: string]: number } | null;
  vehicelType: "car" | "auto" | "motorcycle";
  pickup: string;
  destination: string;
  setConfirmedRidePanel: (open: boolean) => void;
  setVehicelFound: (open: boolean) => void;
};

// ConfirmedRide component
const ConfirmedRide = ({
  fare,
  vehicelType,
  pickup,
  destination,
  setConfirmedRidePanel,
  setVehicelFound,
}: ConfirmedRideProps) => {
  return (
    <>
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold my-4">Confirm Your Ride</h3>
        <button onClick={() => setConfirmedRidePanel(false)}>
          <i className="ri-arrow-down-s-line text-3xl" />
        </button>
      </div>

      {/* Details Section */}
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <img
          src={
            vehicelType === "car"
              ? "/UberCar.webp"
              : vehicelType === "auto"
                ? "/UberAuto.png"
                : vehicelType === "motorcycle"
                  ? "/UberBike.webp"
                  : ""
          }
          alt={
            vehicelType === "car"
              ? "Car logo"
              : vehicelType === "auto"
                ? "Auto logo"
                : vehicelType === "motorcycle"
                  ? "Motorcycle logo"
                  : ""
          }
          className="w-full"
        />
        {/* Pickup point , dropoff point and fair */}
        <div className="w-full divide-y flex flex-col gap-4">
          {/* Pickup point */}
          <div className="flex items-center gap-8 justify-start w-full pb-4">
            <i className="ri-map-pin-2-fill text-3xl bg-[#eee] p-3 rounded-full" />
            <div className="flex flex-col">
              <h3 className="font-bold text-xl">562/11-A</h3>
              <p className="text-gray-500 font-medium text-sm">{pickup}</p>
            </div>
          </div>

          {/* Dropoff point */}
          <div className="flex items-center gap-8 justify-start w-full pb-4">
            <i className="ri-map-pin-user-fill text-3xl bg-[#eee] p-3 rounded-full" />
            <div className="flex flex-col">
              <h3 className="font-bold text-xl">Shubash Park</h3>
              <p className="text-gray-500 font-medium text-sm">{destination}</p>
            </div>
          </div>

          {/* Fair */}
          <div className="flex items-center gap-8 justify-start w-full pb-4">
            <i className="ri-currency-line text-3xl bg-[#eee] p-3 rounded-full" />
            <div className="flex flex-col">
              <h3 className="font-bold text-xl">₹{fare?.[vehicelType]}</h3>
              <p className="text-gray-500 font-medium text-sm">
                Total Fair to pay
              </p>
            </div>
          </div>
        </div>

        {/* Confirm button */}
        <button
          className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg text-xl"
          onClick={async () => {
            setVehicelFound(true);
            setConfirmedRidePanel(false);
            await createRide(pickup, destination, vehicelType);
          }}
        >
          Confirm
        </button>
      </div>
    </>
  );
};

export default ConfirmedRide;
