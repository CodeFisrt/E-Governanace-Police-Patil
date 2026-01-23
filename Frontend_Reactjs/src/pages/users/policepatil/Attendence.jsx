import React, { useState, useEffect } from "react";
import UsersNavbar from "../../../component/UsersNavbar";
import Calender from "react-calendar";
import BackClick from "../../../component/BackClick";
import Location from "../../../component/Location";
import MonthlyCalendar from "../../../component/MonthlyCalendar";
// import "react-calendar/dist/Calendar.css";

function Attendence() {
  // const [calenderDate, setCalenderDate] = useState(new Date());
  const [isLogin, setIsLogin] = useState(false);
  const [attendanceData, setAttendanceData] = useState({
    presentDays: 0,
    absentDays: 0,
    leaveDays: 0,
    dutyHours: 0,
  });
  const [loginTime, setLoginTime] = useState(null);

  // Load attendance data from localStorage
  useEffect(() => {
    const loadAttendanceData = () => {
      try {
        const storedNotifications = localStorage.getItem("notifications");
        if (storedNotifications) {
          const notifications = JSON.parse(storedNotifications);

          // Calculate unique days with activities (present days)
          const uniqueDays = new Set(
            notifications.map((notif) =>
              new Date(notif.timestamp).toLocaleDateString(),
            ),
          ).size;

          // Get stored attendance records
          const storedAttendance = localStorage.getItem("attendanceRecords");
          const attendanceRecords = storedAttendance
            ? JSON.parse(storedAttendance)
            : {};

          // Calculate duty hours (8 hours per day)
          const dutyHours = uniqueDays * 8;

          setAttendanceData({
            presentDays: uniqueDays,
            absentDays: attendanceRecords.absentDays || 0,
            leaveDays: attendanceRecords.leaveDays || 0,
            dutyHours: dutyHours,
          });
        }
      } catch (error) {
        console.error("Error loading attendance data:", error);
      }
    };

    loadAttendanceData();
  }, []);

  const handleClick = () => {
    const today = new Date().toLocaleDateString();

    if (!isLogin) {
      // User is logging in
      const currentTime = new Date().toLocaleTimeString();
      setLoginTime(currentTime);
      setIsLogin(true);

      // Store login record
      const storedAttendance = localStorage.getItem("attendanceRecords");
      const attendanceRecords = storedAttendance
        ? JSON.parse(storedAttendance)
        : {};

      if (!attendanceRecords.loginTime) {
        attendanceRecords.loginTime = currentTime;
        attendanceRecords.loginDate = today;
      }

      localStorage.setItem(
        "attendanceRecords",
        JSON.stringify(attendanceRecords),
      );
    } else {
      // User is logging out
      setIsLogin(false);

      // Store logout record and mark as present
      const storedAttendance = localStorage.getItem("attendanceRecords");
      const attendanceRecords = storedAttendance
        ? JSON.parse(storedAttendance)
        : {};

      attendanceRecords.logoutTime = new Date().toLocaleTimeString();
      attendanceRecords.status = "Present";

      localStorage.setItem(
        "attendanceRecords",
        JSON.stringify(attendanceRecords),
      );

      // Update present days
      setAttendanceData((prev) => ({
        ...prev,
        presentDays: prev.presentDays + 1,
        dutyHours: (prev.presentDays + 1) * 8,
      }));
    }
  };

  return (
    <div className="font-sans ">
      <UsersNavbar />
      <div className="grid grid-cols-4 border p-5">
        <div className="flex col-start-2 gap-4 align-middle items-center ">
          <BackClick />
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
            className="lucide lucide-clock w-5 h-5 text-primary"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Attendence
        </div>
      </div>

      <div className="grid grid-cols-2 w-2/3 align-middle m-auto justify-center gap-2 p-5">
        <div className="grid  gap-5 h-auto ">
          <div className="flex flex-col justify-center align-middle items-center  p-10  rounded-3xl shadow  shadow-gray-400 ">
            <div className="bg-gray-300 rounded-full p-5">
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
                className="lucide lucide-clock w-12 h-12 text-primary  text-blue-950   "
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className="font-bold text-blue-950 text-2xl">
              {" "}
              Start Your Duty{" "}
            </div>
          </div>
          {/* Location */}

          <div className="flex  shadow shadow-gray-400 gap-5 rounded-3xl ">
            <div className="flex justify-center align-middle items-center p-2 m-auto ">
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
                className="lucide lucide-map-pin w-5 h-5 text-primary text-blue-950 "
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                <circle cx="12" cy="10" r="4"></circle>
              </svg>
              <Location isAttendance={true} />
              <button className="bg-gray-200 text-green-300 rounded-2xl  p-1">
                In Geofence
              </button>
            </div>
          </div>

          <div className="shadow shadow-gray-400 rounded-3xl w-full ">
            <button
              className={`${
                isLogin ? "bg-red-700" : "bg-green-700"
              } w-full p-5 rounded-3xl flex justify-center align-middle items-center gap-5  `}
              onClick={handleClick}
            >
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
                className="lucide lucide-log-in w-6 h-6 "
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" x2="3" y1="12" y2="12"></line>
              </svg>
              {isLogin ? "Logout" : "Login"}
            </button>
          </div>
          {/* record */}
          <div className="grid grid-cols-2 gap-2 ">
            <div className=" rounded-2xl shadow p-5 flex flex-col justify-center align-middle items-center text-green-500">
              {attendanceData.presentDays}{" "}
              <p className="text-gray-500">Present</p>
            </div>
            <div className=" rounded-2xl shadow p-5 flex flex-col justify-center align-middle items-center text-red-700">
              {" "}
              {attendanceData.absentDays}{" "}
              <p className="text-gray-500"> Absent</p>
            </div>
            <div className="shadow rounded-2xl p-5 flex flex-col justify-center align-middle items-center text-yellow-500 ">
              {attendanceData.leaveDays} <p className="text-gray-500">Leave</p>
            </div>
            <div className="shadow rounded-2xl p-5 flex flex-col justify-center align-middle items-center text-blue-950 ">
              {attendanceData.dutyHours}{" "}
              <p className="text-gray-500">Duty Hours</p>
            </div>
          </div>
        </div>

        {/* Calender */}
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <MonthlyCalendar />
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Attendence;
