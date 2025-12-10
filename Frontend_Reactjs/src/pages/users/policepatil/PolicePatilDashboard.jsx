// Dashboard.jsx
import React from "react";
// import ToggleButton from "../../component/ToggleButton";

import UsersNavbar from "../../../component/UsersNavbar";
import { Link, Links } from "react-router-dom";
import DailyActivity from "../policepatil/DailyActivity";

const Dashboard = () => {
  const summaryCards = [
    {
      title: "Total Reports",
      value: 24,
      subtext: "↑ 12% from last week",
      bg: "bg-[#0f62fe]",
      icon: "📄",
    },
    {
      title: "Pending Complaints",
      value: 3,
      subtext: "",
      bg: "bg-[#ff832b]",
      icon: "💬",
    },
    {
      title: "Resolved Cases",
      value: 18,
      subtext: "↑ 8% from last week",
      bg: "bg-[#24a148]",
      icon: "✔️",
    },
    {
      title: "Duty Hours",
      value: "156h",
      subtext: "",
      bg: "bg-[#8a3ffc]",
      icon: "⏱️",
    },
  ];

  const quickActions = [
    {
      id: 1,
      label: "Daily Activity Report",
      icon: "📄",
      active: false,
      url: "/dailyactivity",
    },
    {
      id: 2,
      label: "Incident Report",
      icon: "⚠️",
      active: true,
      url: "/incidentReport",
    },

    {
      id: 3,
      label: "Complaints",
      icon: "💬",
      active: false,
      badge: 3,
      url: "/complaints",
    },
    {
      id: 4,
      label: "Attendance",
      icon: "🕒",
      active: false,
      url: "/attendence",
    },
    {
      id: 5,
      label: "Village Info",
      icon: "📍",
      active: false,
      url: "/villageinfo",
    },
    {
      id: 6,
      label: "Notifications",
      icon: "✅",
      active: false,
      badge: 5,
      url: "/notification",
    },
  ];

  const activities = [
    {
      icon: "📄",
      title: "Submitted daily patrol report",
      time: "2 तासांपूर्वी",
    },
    {
      icon: "📩",
      title: "New complaint received - Land dispute",
      time: "4 तासांपूर्वी",
    },
    {
      icon: "⏰",
      title: "Morning check-in completed",
      time: "8 तासांपूर्वी",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      {/* Top Navbar */}
      <UsersNavbar />

      <main className="px-6 md:px-40 py-6 space-y-8">
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
          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-6">
            {quickActions.map((item) => (
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
                  {item.badge && (
                    <span className="absolute top-2 right-3 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs w-5 h-5">
                      {item.badge}
                    </span>
                  )}
                  <span className="text-3xl mb-2">{item.icon}</span>
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
            {activities.map((act, idx) => (
              <div
                key={act.title}
                className={`flex items-center gap-4 px-6 py-4 text-sm ${
                  idx !== activities.length - 1
                    ? "border-b border-gray-100"
                    : ""
                  idx !== activities.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-lg">
                  {act.icon}
                </div>
                <div>
                  <div className="font-medium text-gray-800">{act.title}</div>
                  <div className="text-xs text-gray-500">{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
