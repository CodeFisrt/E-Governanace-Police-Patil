import React, { useState } from "react";
import ToggleButton from "./ToggleButton";

function UsersNavbar() {
  const [language, setLanguage] = useState("en");
  return (
    <div>
      <header className="w-full bg-[#03396c] text-white px-8 py-3 flex items-center justify-between">
        <div className="text-sm md:text-base">
          <div className="opacity-80">Good Afternoon</div>
          <div className="font-semibold text-lg md:text-xl">Ramrao Patil</div>
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
  );
}

export default UsersNavbar;
