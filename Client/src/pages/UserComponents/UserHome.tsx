import { useRef, useState } from "react";
import { Outlet } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

// User Home Page
const UserHome = () => {
  // Ref variables
  const panelRef = useRef<HTMLDivElement>(null);
  const panelCloseRef = useRef<HTMLButtonElement>(null);

  // State variables for form fields
  const [pickup, setPickup] = useState<string>(""); // Pickup location
  const [destination, setDestination] = useState<string>(""); // Destination location
  const [panelOpen, setPanelOpen] = useState<boolean>(false); // Panel state

  // GSAP animation hook
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          top: "0",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          top: "75%",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  // Function to handle pickup location change
  const handlePickup = (pickup: string) => {
    setPickup(pickup);
  };

  // Function to handle destination location change
  const handleDestination = (destination: string) => {
    setDestination(destination);
  };

  // Function to toggle the panel
  const handlePanelOpen = () => {
    setPanelOpen(true);
  };

  // Function to close the panel
  const handlePanelClose = () => {
    setPanelOpen(false);
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="relative h-dvh overflow-hidden">
        {/* Logo */}
        <img
          src="/Uber.png"
          className="w-28 top-5 left-5 absolute z-10"
          alt="Uber Logo"
        />

        {/* Background Map */}
        <div className="h-dvh w-screen">
          <img
            src="https://imgs.search.brave.com/o-Q6bJ_pg1WafiZikzPkNL3w3nBizjXwgyusJsdxPxw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnNz/dGF0aWMubmV0L2d0/aUk3LmdpZg.gif"
            className="h-screen"
            alt=""
          />
        </div>

        {/* Footer */}
        <div
          ref={panelRef}
          className="bg-white flex flex-col justify-start gap-8 h-dvh max-h-dvh absolute z-20 w-full p-4"
        >
          <div className="w-full">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-3xl font-semibold">Find a trip</h4>
              <button
                ref={panelCloseRef}
                className="scale-200 opacity-0"
                onClick={() => {
                  handlePanelClose();
                }}
              >
                <i className="ri-arrow-down-s-line" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              className="flex gap-6 items-center justify-center flex-col"
            >
              <input
                type="text"
                placeholder="Add a pick-up location"
                value={pickup}
                onChange={(e) => {
                  handlePickup(e.target.value);
                }}
                onClick={() => {
                  handlePanelOpen();
                }}
                className="bg-[#eee] px-8 py-2 w-full font-medium rounded"
              />
              <div className="absolute bg-gray-700 h-18 w-1 rounded-full left-[30px] top-[100px]" />
              <input
                type="text"
                placeholder="Enter your destination"
                value={destination}
                onChange={(e) => {
                  handleDestination(e.target.value);
                }}
                onClick={() => {
                  handlePanelOpen();
                }}
                className="bg-[#eee] px-8 py-2 w-full font-medium rounded"
              />
            </form>
          </div>
          <div className="flex flex-col gap-4 overflow-y-scroll">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
            ullam. Ab vero officia quaerat labore autem. Sunt officia maxime
            facilis nostrum dolor adipisci iure. Obcaecati necessitatibus id
            sequi ipsum architecto. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Beatae, est enim dolorum reiciendis veritatis
            quasi. Officia nihil, quos voluptatum assumenda commodi nobis sint
            corporis amet exercitationem obcaecati quasi nam placeat libero
            totam excepturi quam nisi, ex repudiandae ipsa ab tempora dolore
            blanditiis. Aliquid, rerum ullam, reprehenderit corrupti deserunt
            omnis consequatur quo ipsa dolorem autem ea neque pariatur. Sint
            facilis nostrum dolor adipisci iure. Obcaecati necessitatibus id
            sequi ipsum architecto. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Beatae, est enim dolorum reiciendis veritatis
            quasi. Officia nihil, quos voluptatum assumenda commodi nobis sint
            corporis amet exercitationem obcaecati quasi nam placeat libero
            totam excepturi quam nisi, ex repudiandae ipsa ab tempora dolore
            blanditiis. Aliquid, rerum ullam, reprehenderit corrupti deserunt
            omnis consequatur quo ipsa dolorem autem ea neque pariatur. Sint
            facilis nostrum dolor adipisci iure. Obcaecati necessitatibus id
            sequi ipsum architecto. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Beatae, est enim dolorum reiciendis veritatis
            quasi. Officia nihil, quos voluptatum assumenda commodi nobis sint
            corporis amet exercitationem obcaecati quasi nam placeat libero
            totam excepturi quam nisi, ex repudiandae ipsa ab tempora dolore
            blanditiis. Aliquid, rerum ullam, reprehenderit corrupti deserunt
            omnis consequatur quo ipsa dolorem autem ea neque pariatur. Sint
            facilis nostrum dolor adipisci iure. Obcaecati necessitatibus id
            sequi ipsum architecto. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Beatae, est enim dolorum reiciendis veritatis
            quasi. Officia nihil, quos voluptatum assumenda commodi nobis sint
            corporis amet exercitationem obcaecati quasi nam placeat libero
            totam excepturi quam nisi, ex repudiandae ipsa ab tempora dolore
            blanditiis. Aliquid, rerum ullam, reprehenderit corrupti deserunt
            omnis consequatur quo ipsa dolorem autem ea neque pariatur. Sint
            facilis nostrum dolor adipisci iure. Obcaecati necessitatibus id
            sequi ipsum architecto. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Beatae, est enim dolorum reiciendis veritatis
            quasi. Officia nihil, quos voluptatum assumenda commodi nobis sint
            corporis amet exercitationem obcaecati quasi nam placeat libero
            totam excepturi quam nisi, ex repudiandae ipsa ab tempora dolore
            blanditiis. Aliquid, rerum ullam, reprehenderit corrupti deserunt
            omnis consequatur quo ipsa dolorem autem ea neque pariatur. Sint
            numquam sequi, doloribus neque sit molestias ullam laborum ipsa
            corrupti eligendi modi. Eum nobis ut reiciendis dicta aut quam
            accusantium optio, aliquid atque deserunt non nulla exercitationem
            porro cumque placeat perferendis neque ad? Cupiditate porro ipsa
            sint, similique aliquid voluptates sit alias atque quis maxime
            nostrum velit nam aspernatur est obcaecati mollitia accusantium
            facere, recusandae soluta nobis. Tempora rem magnam aspernatur
            dignissimos culpa molestias amet vitae quidem pariatur. Natus totam,
            corporis, sapiente, eligendi deserunt eaque inventore ad dolores
            alias ipsum sint iusto repellendus beatae voluptatum dolorem
            dolorum! Adipisci architecto optio sunt expedita doloribus nihil,
            sint tempore suscipit in deleniti culpa perferendis officia
            aspernatur, ut neque. Repellendus accusantium eos ipsum dicta labore
            id minima in, veniam unde nemo tempora nam assumenda illo aliquid,
            amet magni dolorum, voluptas doloribus dolore ab debitis. Magnam ea
            consectetur non quia cupiditate, quibusdam repudiandae rerum ex
            voluptatibus dolores!
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default UserHome;
