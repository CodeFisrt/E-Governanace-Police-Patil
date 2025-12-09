import React from "react";
import PoliceLogo from "../assets/PoliceLogo.png";
import people from "../assets/people.png";
import policestation from "../assets/policestation.png";
import accounting from "../assets/accounting.png";

import { useState } from "react";
import Login from "./Login";
import ToggleButton from "./ToggleButton";

function Home() {
  const [loginUser, setLoginUser] = useState("");
  const [language, setLanguage] = useState("en"); // en or mr

  const t = {
    en: {
      appTitle: "Police Patil",
      appSubtitle: "Daily Reporting System",
      selectRole: "Select Your Role",
      policePatil: "Police Patil",
      policePatilDesc: "Village level law & order",
      stationOfficer: "Police Station Officer",
      stationOfficerDesc: "Police station management",
      admin: "Administrator",
      adminDesc: "System administrator",
    },
    mr: {
      appTitle: "पोलीस पाटील",
      appSubtitle: "दैनंदिन अहवाल प्रणाली",
      selectRole: "आपली भूमिका निवडा",
      policePatil: "पोलीस पाटील",
      policePatilDesc: "ग्रामस्तरावरील कायदा व सुव्यवस्था",
      stationOfficer: "पोलीस स्टेशन अधिकारी",
      stationOfficerDesc: "पोलीस स्टेशन व्यवस्थापन",
      admin: "प्रशासक",
      adminDesc: "प्रणाली प्रशासक",
    },
  };

  const text = t[language];

  return (
    <>
      <div>
        <nav className="w-full h-23 top-0 start-0 border-b border-default bg-blue-950">
          <div className="flex justify-center items-center w-full text-white">
            <div className="flex justify-between gap-20 w-2/7">
              <div className="flex gap-3 items-center">
                <div className="bg-white shadow border border-white h-14 w-15 rounded-full p-1">
                  <img className="h-12 w-full" src={PoliceLogo} alt="logo" />
                </div>
                <div className="grid items-center justify-center mt-5 mb-5">
                  <div className="font-extrabold ">{text.appTitle}</div>
                  <span className="text-xs text-gray-300 font-bold">
                    {text.appSubtitle}
                  </span>
                </div>
              </div>

              <div className="flex align-middle items-center justify-center">
                {/* 🔗 Pass language + setLanguage here */}
                <ToggleButton language={language} setLanguage={setLanguage} />
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="m-auto grid w-full justify-center gap-4 mt-10">
        <div className="flex justify-center font-sans font-medium text-2xl text-gray-900">
          {text.selectRole}
        </div>

        {/* Police Patil card */}
        <div
          onClick={() => setLoginUser("police_patil")}
          className="cursor-pointer h-20 w-full rounded-2xl flex items-center justify-between gap-2 pl-1 text-sm font-medium text-heading bg-white border border-gray-400 dark:text-black focus:ring-1 hover:bg-gray-200 transition 1s"
        >
          <div className="bg-amber-50 rounded-full p-2 justify-between">
            <img className="h-10 w-10" src={people} alt="" />
          </div>

          <div className="grid w-80">
            <span className="font-bold text-lg text-blue-950">
              {text.policePatil}
            </span>
            <span className="text-sm text-gray-500">
              {text.policePatilDesc}
            </span>
          </div>

          <ArrowIcon />
        </div>

        {/* Police Officer card */}
        <div
          onClick={() => setLoginUser("police_officer")}
          className="h-20 cursor-pointer w-full rounded-2xl flex items-center justify-between gap-2 pl-1 text-sm font-medium text-heading bg-white border border-gray-400 dark:text-black focus:ring-1 hover:bg-gray-200 transition 1s"
        >
          <div className="bg-amber-50 rounded-full p-2 justify-between">
            <img className="h-10 w-10" src={policestation} alt="" />
          </div>
          <div className="grid w-80">
            <span className="font-bold text-lg text-blue-950">
              {text.stationOfficer}
            </span>
            <span className="text-sm text-gray-500">
              {text.stationOfficerDesc}
            </span>
          </div>
          <ArrowIcon />
        </div>

        {/* Admin card */}
        <div
          onClick={() => setLoginUser("admin")}
          className="h-20 cursor-pointer w-full rounded-2xl flex items-center justify-between gap-2 pl-1 text-sm font-medium text-heading bg-white border border-gray-400 dark:text-black focus:ring-1 hover:bg-gray-200 transition 1s"
        >
          <div className="bg-amber-50 rounded-full p-2 justify-between">
            <img className="h-10 w-10" src={accounting} alt="" />
          </div>
          <div className="grid w-80">
            <span className="font-bold text-lg text-blue-950">
              {text.admin}
            </span>
            <span className="text-sm text-gray-500">{text.adminDesc}</span>
          </div>
          <ArrowIcon />
        </div>
      </div>

      {loginUser === "police_patil" && (
        <Login user="police_patil" language={language} />
      )}
      {loginUser === "police_officer" && (
        <Login user="police_officer" language={language} />
      )}
      {loginUser === "admin" && <Login user="admin" language={language} />}
    </>
  );
}

function ArrowIcon() {
  return (
    <div className="flex justify-center align-middle items-center">
      <svg
        width="50px"
        height="30px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 7L15 12L10 17"
          stroke="gray"
          strokeWidth="0.936"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </div>
  );
}

export default Home;
