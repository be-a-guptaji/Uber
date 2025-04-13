import { Link, Outlet } from "react-router";
import CaptianDetails from "../../components/CaptianDetails";
import RidePopUp from "../../components/RidePopUp";
import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../../components/ConfirmRidePopUp";
import { SocketContext } from "../../contexts/SocketDataContext";
import { CaptainDataContext } from "../../contexts/CaptainDataContext";

// Captain home component
const CaptainHome = () => {
  // Ref Variables
  const ridePopupPanelRef = useRef<HTMLDivElement>(null);
  const confirmRidePopupPanelRef = useRef<HTMLDivElement>(null);

  // State Variables
  const [ridePopupPanel, setRidePopupPanel] = useState<boolean>(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] =
    useState<boolean>(false);
  const [ride, setRide] = useState(null);

  // Context Variables
  const { socket } = useContext(SocketContext)!;
  const { captain } = useContext(CaptainDataContext)!;

    useEffect(() => {
      socket.emit("join", {
        userId: captain?._id,
        userType: "captain",
      });
      const updateLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            socket.emit("update-location-captain", {
              userId: captain?._id,
              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
          });
        }
      };

      const locationInterval = setInterval(updateLocation, 10000);
      updateLocation();

      return () => clearInterval(locationInterval)
    }, [captain?._id, socket]);

    socket.on("new-ride", (data) => {
      setRide(data);
      setRidePopupPanel(true);
    });

  // GSAP animation hook for Ride panel
  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopupPanel]);

  // GSAP animation hook for Confirm Ride panel
  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopupPanel]);

  return (
    <>
      <div className="h-dvh">
        {/* Logo */}
        <img src="/Uber.png" className="w-48 ml-4 absolute" alt="Uber Logo" />
        {/* Logout Icon */}
        <Link
          to="/captain-login"
          className="fixed size-10 bg-white flex items-center justify-center rounded-lg right-2 top-8"
        >
          <i className="ri-logout-box-r-line text-3xl font-medium" />
        </Link>

        {/* Map */}
        <div className="h-3/5">
          <img
            src="https://imgs.search.brave.com/o-Q6bJ_pg1WafiZikzPkNL3w3nBizjXwgyusJsdxPxw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnNz/dGF0aWMubmV0L2d0/aUk3LmdpZg.gif"
            className="h-full"
            alt="map"
          />
        </div>

        {/* Ride Details */}
        <div className="h-2/5 p-4">
          <CaptianDetails />
        </div>

        {/* Ride PopUp */}
        <div
          ref={ridePopupPanelRef}
          className="fixed z-30 bottom-0 p-4 bg-white w-full translate-y-full space-y-4"
        >
          <RidePopUp
            setRidePopupPanel={setRidePopupPanel}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          />
        </div>

        {/* Confirm Ride PopUp */}
        <div
          ref={confirmRidePopupPanelRef}
          className="fixed z-30 bottom-0 p-4 bg-white w-full translate-y-full space-y-4"
        >
          <ConfirmRidePopUp
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default CaptainHome;
