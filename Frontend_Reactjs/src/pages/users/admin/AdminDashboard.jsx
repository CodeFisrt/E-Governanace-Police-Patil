import React, { useEffect, useState, useCallback, memo } from "react";
import Users from "./Users";
import Villages from "./Villages";
import Categories from "./Categories";
import Reports from "./Reports";
import PoliceStation from "./PoliceStation";
import UsersNavbar from "../../../component/UsersNavbar";

export let capitalizeString = (str) => {
  let first = str.charAt(0).toUpperCase();
  let second = str.slice(1).toLowerCase();
  return first + second;
};

const AdminDashboard = () => {
  console.log("Admin Dash");

  const [getInfo, setGetInfo] = useState("users");
  const [addUser, setAddUser] = useState(false);

  return (
    <>
      <UsersNavbar />
      <div>
        <main className="px-4 py-6  max-w-7xl mx-auto  ">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="relative flex flex-col p-5 rounded-xl text-white overflow-hidden bg-linear-to-r from-blue-500 to-blue-600">
              <div className="absolute top-3 right-3 opacity-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-users w-12 h-12"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <span className="text-sm font-medium opacity-90">
                Total Patils
              </span>
              <span className="text-3xl font-bold mt-2">156</span>
            </div>
            <div className="relative flex flex-col p-5 rounded-xl text-white overflow-hidden bg-linear-to-r from-green-500 to-green-600">
              <div className="absolute top-3 right-3 opacity-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin w-12 h-12"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <span className="text-sm font-medium opacity-90">
                Total Villages
              </span>
              <span className="text-3xl font-bold mt-2">55</span>
            </div>
            <div className="relative flex flex-col p-5 rounded-xl text-white overflow-hidden bg-linear-to-r from-orange-500 to-orange-600">
              <div className="absolute top-3 right-3 opacity-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-layers w-12 h-12"
                >
                  <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path>
                  <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path>
                  <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path>
                </svg>
              </div>
              <span className="text-sm font-medium opacity-90">Categories</span>
              <span className="text-3xl font-bold mt-2">5</span>
            </div>
            <div className="relative flex flex-col p-5 rounded-xl text-white overflow-hidden bg-linear-to-r from-purple-600 to-purple-800">
              <div className="absolute top-3 right-3 opacity-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-file-text w-12 h-12"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  <path d="M10 9H8"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                </svg>
              </div>
              <span className="text-sm font-medium opacity-90">
                Total Reports
              </span>
              <span className="text-3xl font-bold mt-2">5</span>
            </div>
          </div>
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 ">
            <button
              onClick={() => {
                setGetInfo("users");
              }}
              className={`flex cursor-pointer items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors bg-primary  ${
                getInfo == "users"
                  ? "bg-blue-900 text-gray-200"
                  : "hover:bg-gray-400  bg-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users w-4 h-4"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Users
            </button>
            <button
              onClick={() => {
                setGetInfo("villages");
              }}
              className={`flex cursor-pointer items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors bg-primary  ${
                getInfo == "villages"
                  ? "bg-blue-900 text-gray-200"
                  : "hover:bg-gray-400  bg-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin w-4 h-4"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Villages
            </button>
            <button
              onClick={() => {
                setGetInfo("Police station");
              }}
              className={`flex cursor-pointer items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors bg-primary  ${
                getInfo == "Police station"
                  ? "bg-blue-900 text-gray-200"
                  : "hover:bg-gray-400  bg-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin w-4 h-4"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Police Station
            </button>
            <button
              onClick={() => {
                setGetInfo("categories");
              }}
              className={`flex cursor-pointer items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors bg-primary  ${
                getInfo == "categories"
                  ? "bg-blue-900 text-gray-200"
                  : "hover:bg-gray-400  bg-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-layers w-4 h-4"
              >
                <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path>
                <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path>
                <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path>
              </svg>
              Categories
            </button>
            <button
              onClick={() => setGetInfo("reports")}
              className={`flex cursor-pointer items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors bg-primary  ${
                getInfo == "reports"
                  ? "bg-blue-900 text-gray-200"
                  : "hover:bg-gray-400  bg-gray-200"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-text w-4 h-4"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
              Reports
            </button>
          </div>

          <div className="bg-card card-shadow rounded-xl shadow-inner">
            <div className="flex justify-between p-4">
              <div className="relative w-full sm:w-64">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                <input
                  type="text"
                  className=" bg-gray-100 border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground flex w-full rounded-md shadow bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-9 h-10 focus-visible:ring-2 focus-visible:ring-ring focus:border-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-9 h-10"
                  placeholder="Search"
                />
              </div>
              <button
                className={`inline-flex font-semibold hover:bg-blue-600 items-center cursor-pointer  px-4 py-2 text-white bg-blue-700 text-sm rounded-lg transition-all ${
                  addUser ? "bg-red-500 gap-2 hover:bg-red-600" : ""
                }`}
                onClick={() => {
                  addUser ? setAddUser(false) : setAddUser(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`lucide lucide-plus w-4 h-4 ${
                    addUser ? "rotate-45" : ""
                  }`}
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                {addUser ? `Close` : `Add ${capitalizeString(getInfo)}`}
              </button>
            </div>

            {getInfo == "users" && <Users addUser={addUser} />}
            {getInfo == "villages" && <Villages addUser={addUser} />}
            {getInfo == "categories" && <Categories addUser={addUser} />}
            {getInfo == "reports" && <Reports addUser={addUser} />}
            {getInfo == "Police station" && <PoliceStation addUser={addUser} />}
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
