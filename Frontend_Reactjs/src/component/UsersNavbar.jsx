import React, { useState, useEffect } from "react";
import ToggleButton from "./ToggleButton";
import BackClick from "./BackClick";
import { useNavigate } from "react-router-dom";

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
  const [showLogout, setShowLogout] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();

  // Load notifications from localStorage
  useEffect(() => {
    const loadNotifications = () => {
      try {
        const storedNotifications = localStorage.getItem("notifications");
        if (storedNotifications) {
          const notifications = JSON.parse(storedNotifications);
          // Count unread notifications (where read === false)
          const unreadCount = notifications.filter((n) => !n.read).length;
          setNotificationCount(unreadCount);
        }
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    };

    loadNotifications();

    // Refresh notification count every 2 seconds
    const interval = setInterval(loadNotifications, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    // Clear all user session/data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");

    // Close the dropdown
    setShowLogout(false);

    // Navigate to login page
    navigate("/");
  };

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

              {/* Notification Bell Icon with Badge */}
              <div className="relative cursor-pointer hover:opacity-80 transition">
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
                  class="lucide lucide-bell w-5 h-5"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
                {/* Notification Badge */}
                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </span>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowLogout(!showLogout)}
                  className="hover:opacity-80 transition"
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
                    class="lucide lucide-log-out w-5 h-5 cursor-pointer"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" x2="9" y1="12" y2="12"></line>
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showLogout && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left hover:bg-red-50 rounded-lg transition flex items-center gap-2 text-red-600 font-semibold"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="text-red-500"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" x2="9" y1="12" y2="12"></line>
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>
        </div>
      )}
    </>
  );
}

export default UsersNavbar;
