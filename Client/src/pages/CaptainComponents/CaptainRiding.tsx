import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import FinishRide from "../../components/FinishRide";

// CaptainRiding component
const CaptainRiding = () => {
  // Ref Variables
  const finishRidePanelRef = useRef<HTMLDivElement>(null);

  // State Variables
  const [finishRidePanel, setFinishRidePanel] = useState<boolean>(false);

  // Getting location from the useLocation hook
  const location = useLocation();

  // Getting the ride data from the location
  const rideData = location.state?.ride;

  // GSAP animation hook for Finish Ride panel
  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );
  return (
    <>
      <div className="h-dvh relative flex flex-col justify-end">
        {/* Logo */}
        <img
          src="/Uber.png"
          className="w-48 top-0 ml-4 absolute"
          alt="Uber Logo"
        />
        {/* Logout Icon */}
        <Link
          to="/captain-login"
          className="fixed size-10 bg-white flex items-center justify-center rounded-lg right-2 top-8"
        >
          <i className="ri-logout-box-r-line text-3xl font-medium" />
        </Link>

        <img
          src="https://imgs.search.brave.com/o-Q6bJ_pg1WafiZikzPkNL3w3nBizjXwgyusJsdxPxw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnNz/dGF0aWMubmV0L2d0/aUk3LmdpZg.gif"
          alt="Ride Image"
          className="absolute w-full h-dvh object-cover -z-10"
        />

        {/* Finish Ride */}
        <div
          className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10"
          onClick={() => {
            setFinishRidePanel(true);
          }}
        >
          <h5
            className="p-1 text-center w-[90%] absolute top-0"
          >
            <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
          </h5>
          <h4 className="text-xl font-semibold">4 KM away</h4>
          <button className="bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
            Complete Ride
          </button>
        </div>

        {/* Finish Ride Panel */}
        <div
          ref={finishRidePanelRef}
          className="fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
        >
          <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
        </div>

        {/* Live Tracking */}
        <div className="h-dvh fixed w-dvw top-0 z-[-1]">
          {/* <LiveTracking /> */}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default CaptainRiding;
