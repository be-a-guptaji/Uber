import { useContext } from "react";
import { CaptainDataContext } from "../contexts/CaptainDataContext";

// CaptianDetails component
const CaptianDetails = () => {
  // Context Variables
  const { captain } = useContext(CaptainDataContext)!;

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-8">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1742201835989-4e346e36b364?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="User Pfp"
                className="size-14 rounded-full"
              />
              <h4 className="text-xl font-medium capitalize">
                {captain?.fullName?.firstName + " " + captain?.fullName?.lastName}
              </h4>
            </div>
            <div className="text-right">
              <h4 className="text-xl font-semibold">₹1234.67</h4>
              <p className="text-sm text-gray-600">Fair</p>
            </div>
          </div>
        </div>
        <div className="flex items-center bg-[#eee] p-4 rounded-lg w-full gap-4 justify-between">
          <div className="text-center">
            <i className="ri-timer-2-line mb-2 text-3xl font-thin" />
            <h5 className="text-lg font-medium">10.25</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="ri-speed-up-fill mb-2 text-3xl font-thin" />
            <h5 className="text-lg font-medium">10.25</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="ri-booklet-line mb-2 text-3xl font-thin" />
            <h5 className="text-lg font-medium">10.25</h5>
            <p className="text-sm text-gray-600">Hours Online</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaptianDetails;
