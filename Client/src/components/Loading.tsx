// Define the Loading component
const Loading = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-dvh">
        <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full">
          {/* Spinner */}
          <span className="sr-only">Loading...</span>
        </div>
        {/* Pulsing "Loading..." text */}
        <span className="text-xl text-gray-700 animate-pulse">Loading...</span>
      </div>
    </>
  );
};

export default Loading;
