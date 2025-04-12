import { calculateFare } from "../services/Get/RidesGetAPI";

// Define the prop types for the LocationSearchPanel component
type LocationSearchPanelProps = {
  pickup: string; // The pickup address entered by the user
  destination: string; // The destination address entered by the user
  setFare: React.Dispatch<
    React.SetStateAction<{ [key: string]: number } | null>
  >; // Function to set the fare
  setPanelOpen: React.Dispatch<React.SetStateAction<boolean>>; // Function to control visibility of the current panel
  setVehiclePanelOpen: React.Dispatch<React.SetStateAction<boolean>>; // Function to control visibility of the vehicle selection panel
};

// Functional component for the location search panel
const LocationSearchPanel = ({
  pickup,
  destination,
  setFare,
  setPanelOpen,
  setVehiclePanelOpen,
}: LocationSearchPanelProps) => {
  // Check if the "Next" button should be disabled (either input is empty or just whitespace)
  const isDisabled = !pickup.trim() || !destination.trim();

  // Function to handle the "Next" button click
  const handleNextOperation = async () => {
    // Close this panel and open the vehicle panel when "Next" is clicked
    setVehiclePanelOpen(true);
    setPanelOpen(false);
    const fare = await calculateFare(pickup, destination);
    // Set the fare in the parent component
    setFare(fare);
  };

  return (
    <button
      // Apply different styles based on disabled state
      className={`border-2 p-2 rounded-lg font-bold tracking-widest text-white transition duration-200 ${
        isDisabled
          ? "bg-gray-400 cursor-not-allowed" // Disabled style
          : "bg-green-500 hover:bg-green-600" // Enabled + hover style
      }`}
      onClick={handleNextOperation}
      disabled={isDisabled} // Actually disables the button if needed
    >
      Next
    </button>
  );
};

export default LocationSearchPanel;
