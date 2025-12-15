import { memo, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { capitalizeString } from "./AdminDashboard";

const Users = ({ addUser }) => {
  console.log("add user compo render");

  const token = sessionStorage.getItem("token");

  const [showUsers, setShowUsers] = useState([]);

  const [userRole, setUserRole] = useState("");

  function getRole(event) {
    event.preventDefault();
    setUserRole(event.target.value);
  }

  const getAllUsers = async () => {
    const res = await axios.get(`http://localhost:5000/api/auth/getdetails`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    setShowUsers(res.data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  function AddUser() {
    return (
      <div className="overflow-x-auto">
        <div className="text-center text-lg font-bold cursor-pointer">
          <h3>Add User</h3>
        </div>
        <form className="max-w-xl mx-auto mt-4 grid grid-cols-2 gap-4">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_first_name"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              First name
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_last_name"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Last name
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group border-blue-950">
            <input
              type="tel"
              name="floating_phone"
              id="floating_phone"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2  appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_phone"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Phone number
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_password"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Password
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="repeat_password"
              id="floating_repeat_password"
              className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_repeat_password"
              className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Confirm password
            </label>
          </div>

          <div className="relative  z-0 w-full flex justify-evenly  mb-5 group border-blue-950">
            <label
              htmlFor="dropdown"
              className="block text-sm-lg  text-gray-700 items-center my-auto"
            >
              User Type
            </label>

            <select
              id="dropdown"
              className=" px-4 py-1 rounded-lg border border-gray-300 bg-white 
               text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:border-blue-500 transition-all cursor-pointer"
              onChange={(event) => getRole(event)}
              value={userRole}
            >
              <option value="">Select Role</option>
              <option value="police_patil">Police Patil</option>
              <option value="police_station">Police Station</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div className="z-0 w-full flex justify-evenly mb-5 border-blue-950"></div>

          <button
            type="submit"
            className="text-black bg-brand box-border col-start-2 bg-gray-500 cursor-pointer rounded-2xl border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      {addUser ? (
        <AddUser />
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
              {showUsers.map((user) => (
                <tr
                  className="border-t border-b border-gray-300 text-sm hover:bg-gray-100 transition-colors 2s"
                  key={user.user_id}
                >
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
                        {capitalizeString(`${user.first_name}`)}{" "}
                        {capitalizeString(`${user.last_name}`)}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">{user.village_id}</td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">{user.role}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default memo(Users);
