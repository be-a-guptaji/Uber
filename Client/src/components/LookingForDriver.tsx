// Types for the LookingForDriver component
type LookingForDriverProps = {
  fare: { [key: string]: number } | null;
  vehicelType: "car" | "auto" | "motorcycle";
  pickup: string;
  destination: string;
  setVehicelFound: (open: boolean) => void;
};

// LookingForDriver component
const LookingForDriver = ({
  fare,
  vehicelType,
  pickup,
  destination,
  setVehicelFound,
}: LookingForDriverProps) => {
  return (
    <>
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold my-4">Looking For Driver</h3>
        <button onClick={() => setVehicelFound(false)}>
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
              <h3 className="font-bold text-xl">11/25-k</h3>
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
      </div>
    </>
  );
};

export default LookingForDriver;
