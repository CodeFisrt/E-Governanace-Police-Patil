// Dashboard.jsx
import React, { useState, useEffect } from "react";
// import ToggleButton from "../../component/ToggleButton";

import UsersNavbar from "../../../component/UsersNavbar";
import { Link, Links } from "react-router-dom";
import DailyActivity from "../policepatil/DailyActivity";

const Dashboard = () => {
  const [recentActivities, setRecentActivities] = useState([]);
  const [summaryData, setSummaryData] = useState({
    totalReports: 0,
    pendingComplaints: 0,
    resolvedCases: 0,
    dutyHours: 0,
  });
  const [badgeCounts, setBadgeCounts] = useState({
    complaints: 0,
    notifications: 0,
    incidentReports: 0,
  });

  // Fetch summary data from localStorage
  useEffect(() => {
    const fetchSummaryData = () => {
      try {
        const storedNotifications = localStorage.getItem("notifications");
        if (storedNotifications) {
          const notifications = JSON.parse(storedNotifications);

          // Calculate totals
          const incidentReports = notifications.filter(
            (notif) => notif.type === "incident",
          ).length;
          const pendingComplaints = notifications.filter(
            (notif) => notif.type === "complaint" && notif.status === "Pending",
          ).length;
          const resolvedComplaints = notifications.filter(
            (notif) =>
              notif.type === "complaint" && notif.status === "Completed",
          ).length;
          const unreadNotifications = notifications.filter(
            (notif) => !notif.isRead,
          ).length;

          // Assume 8 hours of duty per day, calculate based on number of days with activities
          const uniqueDays = new Set(
            notifications.map((notif) =>
              new Date(notif.timestamp).toLocaleDateString(),
            ),
          ).size;
          const dutyHours = uniqueDays * 8;

          setSummaryData({
            totalReports: incidentReports,
            pendingComplaints: pendingComplaints,
            resolvedCases: resolvedComplaints,
            dutyHours: dutyHours,
          });

          // Set badge counts
          setBadgeCounts({
            complaints: pendingComplaints,
            notifications: unreadNotifications,
            incidentReports: incidentReports,
          });
        }
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };

    fetchSummaryData();
    // Refresh every 5 seconds
    const interval = setInterval(fetchSummaryData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch notifications from localStorage
  useEffect(() => {
    const fetchActivities = () => {
      try {
        const storedNotifications = localStorage.getItem("notifications");
        if (storedNotifications) {
          const notifications = JSON.parse(storedNotifications);
          // Sort by timestamp and get last 5
          const sortedNotifications = notifications
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 5);

          // Convert notifications to activity format
          const activities = sortedNotifications.map((notif) => ({
            id: notif.id,
            icon: getActivityIcon(notif.type),
            title: notif.title,
            message: notif.message,
            time: getTimeAgo(notif.timestamp),
            type: notif.type,
          }));

          setRecentActivities(activities);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
    // Refresh every 5 seconds to show real-time updates
    const interval = setInterval(fetchActivities, 5000);
    return () => clearInterval(interval);
  }, []);

  // Helper function to get activity icon based on type
  const getActivityIcon = (type) => {
    if (type === "incident") {
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
          className="lucide lucide-triangle-alert w-5 h-5 text-red-600"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
          <path d="M12 9v4"></path>
          <path d="M12 17h.01"></path>
        </svg>
      );
    } else if (type === "complaint") {
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
          className="lucide lucide-message-square w-5 h-5 text-blue-600"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      );
    }
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
        className="lucide lucide-bell w-5 h-5 text-gray-600"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
      </svg>
    );
  };

  // Helper function to format time
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} मिनिट पूर्वी`;
    if (diffHours < 24) return `${diffHours} तासांपूर्वी`;
    if (diffDays < 7) return `${diffDays} दिवसांपूर्वी`;

    return time.toLocaleDateString("mr-IN");
  };

  const summaryCards = [
    {
      title: "Total Reports",
      value: summaryData.totalReports,
      subtext:
        summaryData.totalReports > 0
          ? "Incident reports submitted"
          : "No reports yet",
      bg: "bg-[#0f62fe]",
      icon: (
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
      ),
    },
    {
      title: "Pending Complaints",
      value: summaryData.pendingComplaints,
      subtext: "",
      bg: "bg-[#ff832b]",
      icon: (
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
          className="lucide lucide-message-square w-12 h-12"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
    },
    {
      title: "Resolved Cases",
      value: summaryData.resolvedCases,
      subtext:
        summaryData.resolvedCases > 0
          ? "Cases completed"
          : "No resolved cases yet",
      bg: "bg-[#24a148]",
      icon: (
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
          className="lucide lucide-circle-check-big w-12 h-12"
        >
          <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
          <path d="m9 11 3 3L22 4"></path>
        </svg>
      ),
    },
    {
      title: "Duty Hours",
      value: `${summaryData.dutyHours}h`,
      subtext: "",
      bg: "bg-[#8a3ffc]",
      icon: (
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
          className="lucide lucide-clock w-12 h-12"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
    },
  ];

  // Create quickActions with dynamic badge counts
  const getQuickActions = () => [
    {
      id: 1,
      label: "Daily Activity Report",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-file-text w-10 h-10"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
          <path d="M10 9H8"></path>
          <path d="M16 13H8"></path>
          <path d="M16 17H8"></path>
        </svg>
      ),
      active: false,
      url: "/dailyactivity",
    },
    {
      id: 2,
      label: "Incident Report",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-triangle-alert w-10 h-10"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
          <path d="M12 9v4"></path>
          <path d="M12 17h.01"></path>
        </svg>
      ),
      active: true,
      url: "/incidentReport",
    },

    {
      id: 3,
      label: "Complaints",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-message-square w-10 h-10"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      active: false,
      badge: badgeCounts.complaints,
      url: "/complaints",
    },
    {
      id: 4,
      label: "Attendance",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-clock w-10 h-10"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      active: false,
      url: "/attendence",
    },
    {
      id: 5,
      label: "Village Info",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-map-pin w-10 h-10"
        >
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      active: false,
      url: "/villageinfo",
    },
    {
      id: 6,
      label: "Notifications",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-file-check w-10 h-10"
        >
          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
          <path d="m9 15 2 2 4-4"></path>
        </svg>
      ),
      active: false,
      badge: badgeCounts.notifications,
      url: "/notification",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      {/* Top Navbar */}
      <UsersNavbar />

      <main className="px-6 md:px-35 py-6 space-y-8">
        {/* Summary cards */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.title}
              className={`${card.bg} text-white rounded-xl px-6 py-4 shadow-sm flex flex-col justify-between`}
            >
              <div className="flex items-start justify-between">
                <div className="text-sm opacity-90">{card.title}</div>
                <div className="text-2xl">{card.icon}</div>
              </div>
              <div className="mt-4 text-3xl font-semibold">{card.value}</div>
              {card.subtext && (
                <div className="mt-2 text-xs opacity-80">{card.subtext}</div>
              )}
            </div>
          ))}
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-3">
            Quick Actions
          </h2>
          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-6 ">
            {getQuickActions().map((item) => (
              <button
                key={item.id}
                className={`relative flex flex-col items-center justify-center rounded-xl border shadow-sm py-6 px-2 text-center transition 
                ${
                  item.active
                    ? "bg-[#e02020] text-white border-transparent"
                    : "bg-white text-gray-800 border-gray-100 hover:shadow-md"
                }`}
              >
                <Link to={item.url}>
                  {item.badge > 0 && (
                    <span className="absolute top-2 right-3 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs w-5 h-5">
                      {item.badge}
                    </span>
                  )}

                  <span className="flex p-2 justify-center items-end align-middle">
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium leading-tight">
                    {item.label}
                  </span>
                </Link>
              </button>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-3">
            Recent Activity
          </h2>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {recentActivities.length > 0 ? (
              recentActivities.map((act, idx) => (
                <div
                  key={act.id}
                  className={`flex items-center gap-4 px-6 py-4 text-sm ${
                    idx !== recentActivities.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-lg">
                    {act.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium text-gray-800">{act.title}</div>
                    <div className="text-xs text-gray-600">{act.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{act.time}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-gray-500">
                <p>No recent activities yet</p>
                <p className="text-xs mt-2">
                  Submit incident reports or complaints to see them here
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
