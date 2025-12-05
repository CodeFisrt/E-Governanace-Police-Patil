import React from "react";
import PoliceLogo from "../assets/PoliceLogo.png";
import people from "../assets/people.png";
import policestation from "../assets/policestation.png";
import accounting from "../assets/accounting.png";

import { useState } from "react";
import Login from "./Login";

function Home() {
  const [language, setLanguage] = useState("English");
  const [loginUser, setLoginUser] = useState("");

  function ToggleButton() {
    return (
      <div className="flex items-center gap-1 bg-[#0B2A52] p-2 rounded-full w-fit">
        {/* Marathi Button */}
        <button
          onClick={() => setLanguage("Marathi")}
          className={` py-1 px-2 rounded-full font-semibold transition-all ${
            language === "Marathi" ? "bg-white text-[#0B2A52]" : "text-white"
          }`}
        >
          मराठी
        </button>

        {/* English Button */}
        <button
          onClick={() => setLanguage("English")}
          className={`px-2 py-1 rounded-full font-semibold transition-all ${
            language === "English" ? "text-[#0B2A52] bg-white " : "text-white"
          }`}
        >
          English
        </button>
      </div>
    );
  }

  return (
    <>
      <div>
        <nav className="  w-full z-20 top-0 start-0 border-b border-default bg-blue-950">
          <div className="max-w-screen-xl  flex justify-center items-center  mx-auto p-4 text-white ">
            <div className="flex p-2 gap-2">
              <span className="bg-amber-50 rounded-full p-2">
                <img className="h-16 w-18 " src={PoliceLogo} alt="asaa" />
              </span>
              <div className="grid items-center justify-center mt-2 mb-5">
                <span className="self-center font-serif font-extrabold text-2xl text-heading  whitespace-nowrap">
                  Police Patil
                </span>
                <span className="">Daily Reporting System</span>
              </div>
            </div>
            <div className="flex align-middle items-center justify-center">
              <ToggleButton />
            </div>
          </div>
        </nav>
      </div>
      <div className=" grid w-full m-auto justify-center gap-4 mt-30 ">
        <div
          onClick={() => setLoginUser("police_patil")}
          className=" cursor-pointer h-20 w-full rounded-2xl flex items-center justify-between gap-2 pl-1 text-sm font-serif font-medium text-heading rounded-base bg-white border border-gray-400  dark:text-black focus:ring-1 hover:bg-gray-200 transition 1s "
        >
          <div className="bg-amber-50 rounded-full p-2 justify-between ">
            <img
              className="h-10 w-10 flex items-start justify-between  "
              src={people}
              alt=""
            />
          </div>
          <div className="grid font-serif">
            <span className="text-2xl">Police Patil</span>
            <span className="text-10px">Village level law & order</span>
          </div>
          <div className="flex justify-center align-middle items-center">
            <svg
              width="60px"
              height="60px"
              viewBox="0 0 24.00 24.00"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M10 7L15 12L10 17"
                  stroke="#000000"
                  strokeWidth="0.9359999999999999"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
        </div>
        <div
          onClick={() => setLoginUser("police_officer")}
          className="h-20 cursor-pointer w-full rounded-2xl flex items-center justify-between gap-2 pl-1 text-sm font-serif font-medium text-heading rounded-base bg-white border border-gray-400  dark:text-black focus:ring-1 hover:bg-gray-200 transition 1s   "
        >
          <div className="bg-amber-50 rounded-full p-2 justify-between ">
            <img
              className="h-10 w-10 flex items-start justify-between  "
              src={policestation}
              alt=""
            />
          </div>
          <div className="grid font-serif">
            <span className=" text-2xl">Police Station Officer</span>
            <span className="text-10px">Police station management</span>
          </div>
          <svg
            width="60px"
            height="60px"
            viewBox="0 0 24.00 24.00"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M10 7L15 12L10 17"
                stroke="#000000"
                strokeWidth="0.9359999999999999"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </div>
        <div
          onClick={() => setLoginUser("admin")}
          className=" h-20 cursor-pointer w-full rounded-2xl flex items-center justify-between gap-2 pl-1 text-sm font-serif font-medium text-heading rounded-base bg-white border border-gray-400  dark:text-black focus:ring-1  hover:bg-gray-200 transition 1s "
        >
          <div className="bg-amber-50 rounded-full p-2 justify-between ">
            <img
              className="h-10 w-10 flex items-start justify-between  "
              src={accounting}
              alt=""
            />
          </div>
          <div className="grid font-serif">
            <span className=" text-2xl">Administrator</span>
            <span className="text-10px">System administrator</span>
          </div>
          <div className="flex justify-center align-middle items-center">
            <svg
              width="60px"
              height="60px"
              viewBox="0 0 24.00 24.00"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M10 7L15 12L10 17"
                  stroke="#000000"
                  strokeWidth="0.9359999999999999"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
        </div>
      </div>

      {loginUser == "police_patil" && <Login user="police_patil" />}
      {loginUser == "police_officer" && <Login user="police_officer" />}
      {loginUser == "admin" && <Login user="admin" />}
    </>
  );
}

export default Home;
