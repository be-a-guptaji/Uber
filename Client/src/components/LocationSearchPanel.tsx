// LocationSearchPanel component
const LocationSearchPanel = () => {
  return (
    <>
      <div className="flex items-center justify-start min-h-20 px-4 border rounded-lg bg-[#eee]">
        <h1 className="bg-black text-white rounded-full scale-200 px-1 ml-4 mr-6">
          <i className="ri-map-pin-2-line" />
        </h1>
        <h4 className="text-lg font-semibold">
          Address 1, Near delivery point
        </h4>
      </div>
    </>
  );
};

export default LocationSearchPanel;
