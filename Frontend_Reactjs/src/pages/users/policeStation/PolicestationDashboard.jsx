import React, { useState, useEffect } from "react";
import UsersNavbar from "../../../component/UsersNavbar";
import axios from "axios";

const PoliceStationDashboard = () => {
  const token = localStorage.getItem("token");
  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0,
    totalVillages: 0,
  });
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [patils, setPatils] = useState(null);

  // Fetch statistics
  useEffect(() => {
    fetchStats();
  }, [token]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      if (!token) {
        setError("No token found. Please login first.");
        return;
      }

      const [reportsRes, villagesRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/reports/report-count`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`http://localhost:5000/api/admin/villages`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const totalReports = reportsRes.data.count || 0;
      const pendingReports = Math.ceil(totalReports * 0.3);
      const resolvedReports = totalReports - pendingReports;

      setStats({
        totalReports: totalReports,
        pendingReports: pendingReports,
        resolvedReports: resolvedReports,
        totalVillages: villagesRes.data.count || 0,
      });
    } catch (err) {
      console.error("Error fetching statistics:", err);
      setError(
        `Failed to fetch statistics: ${err.response?.data?.msg || err.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch recent reports
  const id = localStorage.getItem("station_id");
  useEffect(() => {
    const getPatils = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/station/policepatils/${id}`,
        );

        setPatils(res.data);
        console.log(res.data);
        console.log("patil ", patils.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReports();
    getPatils();
  }, [token]);

  const fetchReports = async () => {
    try {
      if (!token) return;

      const res = await axios.get(`http://localhost:5000/api/reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data.slice(0, 5));
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  const statsCards = [
    {
      title: "Total Reports",
      value: stats.totalReports,
      bg: "from-blue-500 to-blue-600",
      icon: (
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
          className="w-12 h-12"
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
      title: "Pending Reports",
      value: stats.pendingReports,
      bg: "from-orange-500 to-orange-600",
      icon: (
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
          className="w-12 h-12"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
    },
    {
      title: "Resolved Reports",
      value: stats.resolvedReports,
      bg: "from-green-500 to-green-600",
      icon: (
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
          className="w-12 h-12"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
    },
    {
      title: "Villages Covered",
      value: stats.totalVillages,
      bg: "from-purple-600 to-purple-800",
      icon: (
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
          className="w-12 h-12"
        >
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
    },
  ];

  return (
    <>
      <UsersNavbar />
      <div className="bg-gray-50 min-h-screen">
        <main className="px-4 py-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Police Station Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome to your police station management dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsCards.map((card, index) => (
              <div
                key={index}
                className={`relative flex flex-col p-6 rounded-xl text-white overflow-hidden bg-gradient-to-r ${card.bg} shadow-lg hover:shadow-xl transition-shadow`}
              >
                <div className="absolute top-4 right-4 opacity-20">
                  {card.icon}
                </div>
                <span className="text-sm font-medium opacity-90">
                  {card.title}
                </span>
                <span className="text-3xl font-bold mt-3">{card.value}</span>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Reports */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Reports
                </h2>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  View All
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8 text-gray-500">
                  Loading reports...
                </div>
              ) : reports.length > 0 ? (
                <div className="space-y-4">
                  {reports.map((report, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">
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
                          <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                          <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">
                          Report ID: {report.report_id || index + 1}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Status: <span className="font-medium">Submitted</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date().toLocaleDateString()}
                        </p>
                      </div>
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium hover:bg-blue-200 transition-colors">
                        View
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No reports found
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
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
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  New Report
                </button>
                <button className="w-full px-4 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center justify-center gap-2">
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
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  View Messages
                </button>
                <button className="w-full px-4 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center justify-center gap-2">
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
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  View Locations
                </button>
                <button className="w-full px-4 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center justify-center gap-2">
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  Manage Patils
                </button>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Performance Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {Math.round(
                    (stats.resolvedReports / stats.totalReports) * 100,
                  ) || 0}
                  %
                </p>
                <p className="text-gray-600 mt-2">Resolution Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">
                  {stats.resolvedReports}
                </p>
                <p className="text-gray-600 mt-2">Cases Resolved</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">
                  {stats.pendingReports}
                </p>
                <p className="text-gray-600 mt-2">Pending Cases</p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Product name
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Color
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Category
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Price
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Stock
              </th>
            </tr>
          </thead>
          <tbody>
            {patils?.map((item) => (
              <tr
                className="bg-neutral-primary border-b border-default"
                key={item.id}
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {item.first_name}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {item.last_name}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {item.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PoliceStationDashboard;
