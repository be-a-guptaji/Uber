import { Link, Outlet } from "react-router";
import CaptianDetails from "../../components/CaptianDetails";

// Captain home component
const CaptainHome = () => {
  return (
    <>
      <div className="h-dvh">
        {/* Home Icon */}
        {/* Logo */}
        <img src="/Uber.png" className="w-48 ml-4 absolute" alt="Uber Logo" />
        <Link
          to="/captain-login"
          className="fixed size-10 bg-white flex items-center justify-center rounded-lg right-2 top-2"
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
      </div>
      <Outlet />
    </>
  );
};

export default CaptainHome;
