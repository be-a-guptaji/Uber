// Define the type for the LocationSearchPanelProps
type LocationSearchPanelProps = {
  setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setVehiclePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// LocationSearchPanel component
const LocationSearchPanel = ({
  setPanelOpen,
  setVehiclePanelOpen,
}: LocationSearchPanelProps) => {
  return (
    <>
      <button
        className="flex w-full items-center justify-start min-h-20 px-4 border rounded-xl border-gray-400 active:border-black active:border-2 bg-[#eee]"
        onClick={() => {
          setVehiclePanelOpen(true);
          setPanelOpen(false);
        }}
      >
        <h1 className="bg-black text-white rounded-full scale-200 px-1 ml-4 mr-6">
          <i className="ri-map-pin-2-line" />
        </h1>
        <h4 className="text-lg font-semibold">
          Address 1, Near delivery point
        </h4>
      </button>
    </>
  );
};

export default LocationSearchPanel;
