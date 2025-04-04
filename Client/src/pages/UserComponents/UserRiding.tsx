import { Link, Outlet } from "react-router";

// Define the Riding component
const UserRiding = () => {
  return (
    <>
      <div className="h-dvh">
        {/* Home Icon */}
        <Link
          to="/"
          className="fixed size-10 bg-white flex items-center justify-center rounded-lg right-2 top-2"
        >
          <i className="ri-home-5-line text-3xl font-medium" />
        </Link>

        {/* Map */}
        <div className="h-1/2">
          <img
            src="https://imgs.search.brave.com/o-Q6bJ_pg1WafiZikzPkNL3w3nBizjXwgyusJsdxPxw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnNz/dGF0aWMubmV0L2d0/aUk3LmdpZg.gif"
            className="h-full"
            alt="map"
          />
        </div>

        {/* Ride Details */}
        <div className="h-1/2 p-4">
          {/* Details Section */}
          <div className="flex items-center justify-between">
            <img src="/UberCar.webp" alt="Uber Car" className="w-36" />
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
                <p className="text-gray-500 font-medium text-sm">
                  Jamna Par, New Delhi
                </p>
              </div>
            </div>

            {/* Dropoff point */}
            <div className="flex items-center gap-8 justify-start w-full pb-4">
              <i className="ri-map-pin-user-fill text-3xl bg-[#eee] p-3 rounded-full" />
              <div className="flex flex-col">
                <h3 className="font-bold text-xl">Shubash Park</h3>
                <p className="text-gray-500 font-medium text-sm">
                  Mg Road, Agra
                </p>
              </div>
            </div>

            {/* Fair */}
            <div className="flex items-center gap-8 justify-start w-full pb-4">
              <i className="ri-currency-line text-3xl bg-[#eee] p-3 rounded-full" />
              <div className="flex flex-col">
                <h3 className="font-bold text-xl">₹1234.45</h3>
                <p className="text-gray-500 font-medium text-sm">
                  Total Fair to pay
                </p>
              </div>
            </div>
          </div>
          <button className="w-full bg-green-600 text-white font-semibold p-2 rounded-lg text-xl">
            Make a Payment
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default UserRiding;
