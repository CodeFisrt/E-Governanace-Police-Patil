import React, { useState, useEffect } from "react";
import ToggleButton from "../../../component/ToggleButton";
import UsersNavbar from "../../../component/UsersNavbar";
import BackClick from "../../../component/BackClick";
import axios from "axios";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch notifications from localStorage and API
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Filter notifications based on active tab
  useEffect(() => {
    if (activeTab === "All") {
      setFilteredNotifications(notifications);
    } else if (activeTab === "Unread") {
      setFilteredNotifications(notifications.filter((n) => !n.isRead));
    }
  }, [notifications, activeTab]);

  const fetchNotifications = () => {
    setLoading(true);
    try {
      // Get notifications from localStorage
      const storedNotifications = localStorage.getItem("notifications");
      if (storedNotifications) {
        const parsedNotifications = JSON.parse(storedNotifications);
        setNotifications(
          parsedNotifications.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
          ),
        );
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, isRead: true } : notif,
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({
      ...notif,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(
      (notif) => notif.id !== id,
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "incident":
        return (
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
            className="w-6 h-6 text-red-600"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
          </svg>
        );
      case "complaint":
        return (
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
            className="w-6 h-6 text-blue-600"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        );
      default:
        return (
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
            className="w-6 h-6 text-gray-600"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <path d="M12 1v6m0 6v6"></path>
            <path d="M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24"></path>
            <path d="M1 12h6m6 0h6"></path>
            <path d="M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"></path>
          </svg>
        );
    }
  };

  const getStatusColor = (severity) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div>
      <UsersNavbar />
      <div className="grid grid-cols-3 align-middle items-center border border-blue-950 p-5">
        <div className="flex gap-2 col-start-2 w-full items-center text-lg">
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
            className="lucide lucide-bell w-5 h-5 text-primary text-blue-950"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
          </svg>
          <div className="font-semibold">
            Notifications {unreadCount > 0 && `(${unreadCount})`}
          </div>
        </div>
        <div className="grid col-start-3 w-full">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-blue-950 font-semibold w-fit rounded-2xl p-2 hover:bg-gray-200 transition"
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 p-5 border-b">
        {["All", "Unread"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === tab
                ? "bg-blue-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto p-5 space-y-4">
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading notifications...
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12 mx-auto mb-3 text-gray-400"
            >
              <path d="M6 8a6 6 0 0 1 12 0"></path>
              <path d="M20.92 2.3a9.95 9.95 0 0 0-19.84 0"></path>
            </svg>
            <p className="text-lg">No notifications yet</p>
            <p className="text-sm">Check back later for updates</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`rounded-lg shadow border p-4 transition cursor-pointer ${
                notification.isRead
                  ? "bg-white border-gray-200"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {notification.title}
                      </h3>
                      <p className="text-gray-700 mt-1">
                        {notification.message}
                      </p>

                      {notification.type === "incident" &&
                        notification.severity && (
                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                notification.severity,
                              )}`}
                            >
                              Severity: {notification.severity}
                            </span>
                          </div>
                        )}

                      {notification.type === "complaint" &&
                        notification.status && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              Status: {notification.status}
                            </span>
                          </div>
                        )}

                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>

                    {!notification.isRead && (
                      <span className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full mt-1"></span>
                    )}
                  </div>
                </div>

                {/* Delete Button */}
                <div className="flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    className="text-gray-400 hover:text-red-600 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;
