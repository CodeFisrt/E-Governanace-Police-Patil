import React, { useState } from "react";
import ToggleButton from "./ToggleButton";
import BackClick from "./BackClick";

const AccidentNavbar = () => (
  <div className="w-full bg-red-500 justify-center  text-white p-4 flex items-center align-middle justify-between font-sans ">
    <header className={` w-1/3 flex justify-between align items-center`}>
      <div className="text-sm md:text-base">
        <div className="opacity-80 flex gap-2 items-center size-max">
          <BackClick />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-triangle-alert w-6 h-6 animate-pulse"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
          </svg>
          Incident Report
        </div>
      </div>
      <div>
        <button
          onClick={() => console.log("hell")}
          className="btn p-3 bg-white rounded-3xl align-middle items-center text-red-500 cursor-pointer hover:text-red-600 justify-center "
        >
          <a href="tel:+91100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-phone w-4 h-4"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            100
          </a>
        </button>
      </div>
    </header>
  </div>
);

function UsersNavbar({ incidentNavbar }) {
  const [language, setLanguage] = useState("en");

  return (
    <>
      {incidentNavbar ? (
        <AccidentNavbar />
      ) : (
        <div>
          <header
            className={`w-full bg-[#03396c] text-white px-8 py-3 flex items-center justify-between `}
          >
            <div className="text-sm md:text-base">
              <div className="opacity-80">Good Afternoon</div>
              <div className="font-semibold text-lg md:text-xl">
                Ramrao Patil
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Language toggle */}
              <ToggleButton language={language} setLanguage={setLanguage} />

              {/* Icons (placeholders) */}
              <button className="relative w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg">
                🔔
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg">
                ⏻
              </button>
            </div>
          </header>
        </div>
      )}
    </>
  );
}

export default UsersNavbar;
