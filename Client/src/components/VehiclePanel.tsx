// Types for the VehiclePanel component
type VehiclePanelProps = {
  fare: { [key: string]: number } | null;
  setVehiclePanelOpen: (open: boolean) => void;
  setConfirmedRidePanel: (open: boolean) => void;
};

// Vehicle panel component
const VehiclePanel = ({
  fare,
  setVehiclePanelOpen,
  setConfirmedRidePanel,
}: VehiclePanelProps) => {
  return (
    <>
      {/* Heading */}
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold my-4">Choose Your Ride</h3>
        <button onClick={() => setVehiclePanelOpen(false)}>
          <i className="ri-arrow-down-s-line text-3xl" />
        </button>
      </div>
      {/* Car card */}
      <button
        className="flex items-center justify-between bg-[#eee] active:border-2 rounded-xl p-4 w-full border-gray-400 active:border-black border"
        onClick={() => {
          setVehiclePanelOpen(false);
          setConfirmedRidePanel(true);
        }}
      >
        <img src="/UberCar.webp" alt="Car logo" className="w-20" />
        <div className="w-[45%] flex flex-col items-start">
          <h4 className="font-bold tracking-wide text-xl w-full inline-flex justify-between">
            UberGo{" "}
            <span>
              <i className="ri-user-fill" />4
            </span>
          </h4>
          <h5 className="text-gray-600 font-medium">2 mins away</h5>
          <p className="text-gray-600 text-xs">Affordable, city rides</p>
        </div>
        <h2 className="font-bold text-xl">₹{fare?.car}</h2>
      </button>
      {/* Motercycle card */}
      <button
        className="flex items-center justify-between bg-[#eee] active:border-2 rounded-xl p-4 w-full border-gray-400 active:border-black border"
        onClick={() => {
          setVehiclePanelOpen(false);
          setConfirmedRidePanel(true);
        }}
      >
        <img src="/UberBike.webp" alt="Moto logo" className="w-20" />
        <div className="w-[45%] flex flex-col items-start">
          <h4 className="font-bold tracking-wide text-xl w-full inline-flex justify-between">
            Moto{" "}
            <span>
              <i className="ri-user-fill" />1
            </span>
          </h4>
          <h5 className="text-gray-600 font-medium">1 mins away</h5>
          <p className="text-gray-600 text-xs">Affordable motercycle rides</p>
        </div>
        <h2 className="font-bold text-xl">₹{fare?.motorcycle}</h2>
      </button>
      {/* Auto card */}
      <button
        className="flex items-center justify-between bg-[#eee] active:border-2 rounded-xl p-4 w-full border-gray-400 active:border-black border"
        onClick={() => {
          setVehiclePanelOpen(false);
          setConfirmedRidePanel(true);
        }}
      >
        <img src="/UberAuto.png" alt="Auto logo" className="w-20" />
        <div className="w-[45%] flex flex-col items-start">
          <h4 className="font-bold tracking-wide text-xl w-full inline-flex justify-between">
            UberAuto{" "}
            <span>
              <i className="ri-user-fill" />3
            </span>
          </h4>
          <h5 className="text-gray-600 font-medium">2 mins away</h5>
          <p className="text-gray-600 text-xs">Affordable, compact rides</p>
        </div>
        <h2 className="font-bold text-xl">₹{fare?.auto}</h2>
      </button>
    </>
  );
};

export default VehiclePanel;
