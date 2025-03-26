const Home = () => {
  return (
    <>
      <div className="bg-cover bg-bottom bg-[url('./HomePageBackgroundImage.avif')] h-dvh w-full flex justify-between flex-col pt-2">
        <img src="./Uber.png" className="w-48 ml-4" alt="" />
        <div className="bg-white p-4 pb-7">
          <h2 className="text-3xl font-bold w-full text-center">
            Get Started with Uber
          </h2>
          <button className="w-full bg-black text-white py-3 rounded mt-5">
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
