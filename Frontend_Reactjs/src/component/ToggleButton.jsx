// ToggleButton.jsx
import React, { useState } from "react";

function ToggleButton({ language, setLanguage }) {
  // const [language, setLanguage] = useState("en"); // en or mr

  // 🔥 All text in one place
  const t = {
    en: {
      // appTitle: "Police Patil",
      // appSubtitle: "Daily Reporting System",
      // selectRole: "Select Your Role",
      // policePatil: "Police Patil",
      // policePatilDesc: "Village level law & order",
      // stationOfficer: "Police Station Officer",
      // stationOfficerDesc: "Police station management",
      // admin: "Administrator",
      // adminDesc: "System administrator",
    },
    mr: {
      // appTitle: "पोलीस पाटील",
      // appSubtitle: "दैनंदिन अहवाल प्रणाली",
      // selectRole: "आपली भूमिका निवडा",
      // policePatil: "पोलीस पाटील",
      // policePatilDesc: "ग्रामस्तरावरील कायदा व सुव्यवस्था",
      // stationOfficer: "पोलीस स्टेशन अधिकारी",
      // stationOfficerDesc: "पोलीस स्टेशन व्यवस्थापन",
      // admin: "प्रशासक",
      // adminDesc: "प्रणाली प्रशासक",
    },
  };

  const text = t[language];
  return (
    <div className="flex items-center gap-1 bg-white p-2 rounded-2xl">
      {/* Marathi Button */}
      <button
        onClick={() => setLanguage("mr")}
        className={` py-1 px-2 rounded-full  transition-all ${
          language === "mr" ? "bg-[#0B2A52] text-white" : "text-[#0B2A52]"
        }`}
      >
        मराठी
      </button>

      {/* English Button */}+
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 rounded-full  transition-all ${
          language === "en" ? "text-white bg-[#0B2A52]" : "text-[#0B2A52]"
        }`}
      >
        English
      </button>
    </div>
  );
}

export default ToggleButton;
