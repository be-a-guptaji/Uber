import { useContext, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../../components/LocationSearchPanel";
import VehiclePanel from "../../components/VehiclePanel";
import ConfirmedRide from "../../components/ConfirmedRide";
import LookingForDriver from "../../components/LookingForDriver";
import WaitingForDriver from "../../components/WaitingForDriver";
import { SocketContext } from "../../contexts/SocketDataContext";
import { UserDataContext } from "../../contexts/UserDataContext";

// User Home Page
const UserHome = () => {
  // Hooks variables
  const navigate = useNavigate();

  // Ref variables
  const panelRef = useRef<HTMLDivElement>(null);
  const vehiclePanelRef = useRef<HTMLDivElement>(null);
  const confirmRidePanelRef = useRef<HTMLDivElement>(null);
  const watingForDriverRef = useRef<HTMLDivElement>(null);
  const vehicelFoundRef = useRef<HTMLDivElement>(null);
  const panelCloseRef = useRef<HTMLButtonElement>(null);

  // State variables
  const [pickup, setPickup] = useState<string>(""); // Pickup location
  const [destination, setDestination] = useState<string>(""); // Destination location
  const [panelOpen, setPanelOpen] = useState<boolean>(false); // Panel state
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState<boolean>(false); // Vehicle panel state
  const [confirmedRidePanel, setConfirmedRidePanel] = useState<boolean>(false); // Confirmed ride state
  const [vehicelFound, setVehicelFound] = useState<boolean>(false); // Vehicle found state
  const [waitingForDriver, setWaitingForDriver] = useState<boolean>(false); // Waiting for driver state
  const [fare, setFare] = useState<{
    [key: string]: number;
  } | null>(null); // Fare amount
  const [vehicelType, setVehicelType] = useState<"car" | "auto" | "motorcycle">(
    "car"
  ); // Vehicle type
  const [ride, setRide] = useState(null);

  //Context variables
  const { socket } = useContext(SocketContext)!;
  const { user } = useContext(UserDataContext)!;

  socket.on("ride-confirmed", (ride) => {
    setVehicelFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    console.log("ride");
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } }); // Updated navigate to include ride data
  });

  // Socket connection
  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user?._id });
  }, [socket, user]);

   socket.on("ride-confirmed", (ride) => {
     setVehicelFound(false);
     setWaitingForDriver(true);
     setRide(ride);
   });

   socket.on("ride-started", (ride) => {
     console.log("ride");
     setWaitingForDriver(false);
     navigate("/riding", { state: { ride } }); // Updated navigate to include ride data
   });

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

  // GSAP animation hook for confirmation panel
  useGSAP(() => {
    if (confirmedRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmedRidePanel]);

  // GSAP animation hook for looking for driver panel
  useGSAP(() => {
    if (vehicelFound) {
      gsap.to(vehicelFoundRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(vehicelFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicelFound]);

  // GSAP animation hook for waiting for driver panel
  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(watingForDriverRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(watingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

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
        <div
          className="h-dvh w-screen"
          onClick={() => {
            setPanelOpen(false);
            setVehiclePanelOpen(false);
            setConfirmedRidePanel(false);
            setVehicelFound(false);
          }}
        >
          <img
            src="https://imgs.search.brave.com/o-Q6bJ_pg1WafiZikzPkNL3w3nBizjXwgyusJsdxPxw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnNz/dGF0aWMubmV0L2d0/aUk3LmdpZg.gif"
            className="h-screen"
            alt="map"
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
              pickup={pickup}
              destination={destination}
              setFare={setFare}
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
        <VehiclePanel
          fare={fare}
          setVehicelType={setVehicelType}
          setVehiclePanelOpen={setVehiclePanelOpen}
          setConfirmedRidePanel={setConfirmedRidePanel}
        />
      </div>

      {/* Ride confirmation panel */}
      <div
        ref={confirmRidePanelRef}
        className="fixed z-30 bottom-0 p-4 bg-white w-full translate-y-full space-y-4"
      >
        <ConfirmedRide
          fare={fare}
          vehicelType={vehicelType}
          pickup={pickup}
          destination={destination}
          setConfirmedRidePanel={setConfirmedRidePanel}
          setVehicelFound={setVehicelFound}
        />
      </div>

      {/* Waiting for ride confirmation panel */}
      <div
        ref={vehicelFoundRef}
        className="fixed z-30 bottom-0 p-4 bg-white w-full translate-y-full space-y-4"
      >
        <LookingForDriver
          fare={fare}
          vehicelType={vehicelType}
          pickup={pickup}
          destination={destination}
          setVehicelFound={setVehicelFound}
        />
      </div>

      {/* Driver Details panel */}
      <div
        ref={watingForDriverRef}
        className="fixed z-30 bottom-0 p-4 bg-white w-full translate-y-full space-y-4"
      >
        <WaitingForDriver
          fare={fare}
          ride={ride}
          vehicelType={vehicelType}
          pickup={pickup}
          destination={destination}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>

      <Outlet />
    </>
  );
};

export default UserHome;
