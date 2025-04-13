// Types for the WaitingForDriver component
type WaitingForDriverProps = {
  fare: { [key: string]: number } | null;
  vehicelType: "car" | "auto" | "motorcycle";
  pickup: string;
  destination: string;
  setWaitingForDriver: (value: boolean) => void;
};

// WaitForDriver component
const WaitingForDriver = ({
  fare,
  vehicelType,
  pickup,
  destination,
  setWaitingForDriver,
}: WaitingForDriverProps) => {
  return (
    <>
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold my-4">Your Driver&apos;s Detail</h3>
        <button onClick={() => setWaitingForDriver(false)}>
          <i className="ri-arrow-down-s-line text-3xl" />
        </button>
      </div>

      {/* Details Section */}
      <div className="flex items-center justify-between">
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
          className="w-36"
        />
        <div className="text-right">
          <h2 className="text-lg font-medium capitalize -my-1">Mahendra</h2>
          <h4 className="text-xl font-semibold -my-1">UP 80 AB 1234</h4>
          <p className="text-sm text-gray-600 -my-1">Maruti Suzuki Alto</p>
          <h1 className="text-lg font-semibold -my-1">
            <span className="text-gray-600 font-bold text-xl">OTP</span> :
            789343{" "}
          </h1>
        </div>
      </div>

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
    </>
  );
};

export default WaitingForDriver;
