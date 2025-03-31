import { useRef, useState } from "react";
import { Outlet } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../../components/LocationSearchPanel";

// User Home Page
const UserHome = () => {
  // Ref variables
  const panelRef = useRef<HTMLDivElement>(null);
  const vehiclePanelRef = useRef<HTMLDivElement>(null);
  const panelCloseRef = useRef<HTMLButtonElement>(null);

  // State variables for form fields
  const [pickup, setPickup] = useState<string>(""); // Pickup location
  const [destination, setDestination] = useState<string>(""); // Destination location
  const [panelOpen, setPanelOpen] = useState<boolean>(false); // Panel state
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState<boolean>(false); // Vehicle panel state

  // GSAP animation hook for location panel
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          top: "0",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          top: "77%",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  // GSAP animation hook for vehicle panel
  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanelOpen]);

  // Function to handle pickup location change
  const handlePickup = (pickup: string) => {
    setPickup(pickup);
  };

  // Function to handle destination location change
  const handleDestination = (destination: string) => {
    setDestination(destination);
  };

  // Function to toggle the panel
  const handlePanelOpen = () => {
    setPanelOpen(true);
  };

  // Function to close the panel
  const handlePanelClose = () => {
    setPanelOpen(false);
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="relative h-dvh overflow-hidden">
        {/* Logo */}
        <img
          src="/Uber.png"
          className="w-28 top-5 left-5 absolute z-10"
          alt="Uber Logo"
        />

        {/* Background Map */}
        <div className="h-dvh w-screen">
          <img
            src="https://imgs.search.brave.com/o-Q6bJ_pg1WafiZikzPkNL3w3nBizjXwgyusJsdxPxw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnNz/dGF0aWMubmV0L2d0/aUk3LmdpZg.gif"
            className="h-screen"
            alt=""
          />
        </div>

        {/* Footer */}
        <div
          ref={panelRef}
          className="bg-white flex flex-col justify-start gap-8 h-dvh min-h-dvh absolute z-20 w-full p-4"
        >
          <div className="w-full">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-3xl font-semibold">Find a trip</h4>
              <button
                ref={panelCloseRef}
                className="scale-200 opacity-0"
                onClick={() => {
                  handlePanelClose();
                }}
              >
                <i className="ri-arrow-down-s-line" />
              </button>
            </div>
            {/* Form for pickup and destination */}
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              className="flex gap-6 items-center justify-center flex-col"
            >
              <input
                type="text"
                placeholder="Add a pick-up location"
                value={pickup}
                onChange={(e) => {
                  handlePickup(e.target.value);
                }}
                onClick={() => {
                  handlePanelOpen();
                }}
                className="bg-[#eee] px-8 py-2 w-full font-medium rounded"
              />
              <div className="absolute bg-gray-700 h-18 w-1 rounded-full left-[30px] top-[100px]" />
              <input
                type="text"
                placeholder="Enter your destination"
                value={destination}
                onChange={(e) => {
                  handleDestination(e.target.value);
                }}
                onClick={() => {
                  handlePanelOpen();
                }}
                className="bg-[#eee] px-8 py-2 w-full font-medium rounded"
              />
            </form>
          </div>

          {/* Location search panel */}
          <div className="flex flex-col gap-4 overflow-y-scroll">
            <LocationSearchPanel
              setPanelOpen={setPanelOpen}
              setVehiclePanelOpen={setVehiclePanelOpen}
            />
          </div>
        </div>
      </div>

      {/* Ride selection panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed z-30 bottom-0 p-4 bg-white w-full translate-y-full space-y-4"
      >
        {/* Heading */}
        <h3 className="text-3xl font-bold my-4">Choose Your Ride</h3>
        {/* Car card */}
        <button className="flex items-center justify-between bg-[#eee] active:border-2 rounded-xl p-4 w-full border-gray-400 active:border-black border">
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
          <h2 className="font-bold text-xl">₹1234.45</h2>
        </button>
        {/* Motercycle card */}
        <button className="flex items-center justify-between bg-[#eee] active:border-2 rounded-xl p-4 w-full border-gray-400 active:border-black border">
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
          <h2 className="font-bold text-xl">₹111.67</h2>
        </button>
        {/* Auto card */}
        <button className="flex items-center justify-between bg-[#eee] active:border-2 rounded-xl p-4 w-full border-gray-400 active:border-black border">
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
          <h2 className="font-bold text-xl">₹453.14</h2>
        </button>
      </div>

      <Outlet />
    </>
  );
};

export default UserHome;
