import React, { memo, useCallback, useState } from "react";
import { capitalizeString } from "./AdminDashboard";

const PoliceStation = ({ addUser }) => {
  console.log("Police station renders");

  const AddPoliceStation = () => {
    const [formData, setFormData] = useState({
      police_station_name: "",
      police_station_code: "",
      station_phone: "",
      station_taluka: "",
      station_district: "",
    });

    // 🔹 Handle input changes
    const handleChange = useCallback((e) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }, []);

    // 🔹 Handle form submit
    const handleSubmit = useCallback(
      (e) => {
        e.preventDefault();

        // ✅ ALL FORM VALUES AVAILABLE HERE
        console.log("Submitted Police Station Data:", formData);

        // Example API call
        // axios.post("/api/police-station", formData);
      },
      [formData]
    );
    return (
      <div className="overflow-x-auto">
        <div className="text-center text-lg font-bold cursor-pointer">
          <h3>Add Police Station</h3>
        </div>
        <form
          className="max-w-xl mx-auto mt-4 grid grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="police_station_name"
              id="police_station_name"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              required
              onChange={handleChange}
              value={formData.police_station_name}
              placeholder=" "
            />
            <label
              htmlFor="police_station_name"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Name of Police Station
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="police_station_code"
              id="police_station_code"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              required
              onChange={handleChange}
              value={formData.police_station_code}
            />
            <label
              htmlFor="police_station_code"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Police Station Code
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="station_phone"
              id="station_phone"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              required
              onChange={handleChange}
              value={formData.station_phone}
            />
            <label
              htmlFor="station_phone"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Phone
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="station_taluka"
              id="station_taluka"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              onChange={handleChange}
              value={formData.station_taluka}
              required
            />
            <label
              htmlFor="station_phone"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Taluka
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="station_district"
              id="station_district"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              required
              onChange={handleChange}
              value={formData.station_district}
            />
            <label
              htmlFor="station_district"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              District
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-brand box-border w-1/2 m-auto col-span-2 bg-gray-500 cursor-pointer rounded-2xl border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-bold leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    );
  };
  return (
    <>
      {addUser ? (
        <AddPoliceStation />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-gray-500">
            <thead>
              <tr className="border-t border-b border-gray-300 text-sm ">
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Village</th>
                <th className="text-left p-4">Mobile</th>
                <th className="text-left p-4">Status</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-b border-gray-300 text-sm hover:bg-gray-100 transition-colors 2s">
                <td className="p-4">
                  <div className="flex items-center gap-2 ">
                    <div className="flex bg-blue-100 w-9 h-9 items-center justify-center rounded-full">
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
                        className="text-blue-950 lucide lucide-users w-4 h-4 text-primary"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <span>
                      {capitalizeString(`Nane`)} {capitalizeString(`Name`)}
                    </span>
                  </div>
                </td>
                <td className="p-4">e</td>
                <td className="p-4">e</td>
                <td className="p-4">e</td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end ">
                    <button className="cursor-pointer text-blue-950 h-8 w-8 justify-center items-center flex hover:bg-blue-500 hover:text-white transition-all 1s rounded-sm">
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
                        className="lucide lucide-square-pen w-4 h-4"
                      >
                        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                      </svg>
                    </button>
                    <button className="cursor-pointer text-red-700 h-8 w-8 justify-center items-center flex hover:bg-red-600 hover:text-white transition-all 1s rounded-sm">
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
                        className="lucide lucide-trash2 w-4 h-4"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        <line x1="10" x2="10" y1="11" y2="17"></line>
                        <line x1="14" x2="14" y1="11" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default memo(PoliceStation);
