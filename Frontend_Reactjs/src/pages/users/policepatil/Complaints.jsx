import React from "react";
import UsersNavbar from "../../../component/UsersNavbar";
import BackClick from "../../../component/BackClick";
import { useState, useEffect } from "react";

const TABS = ["All", "Pending", "In Progress", "Completed"];

const defaultComplaintsData = [
 
 
];

function Complaints() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [complaintTitle, setComplaintTitle] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [allComplaints, setAllComplaints] = useState(defaultComplaintsData);

  // Fetch submitted complaints from localStorage
  useEffect(() => {
    const fetchSubmittedComplaints = () => {
      try {
        const storedNotifications = localStorage.getItem("notifications");
        if (storedNotifications) {
          const notifications = JSON.parse(storedNotifications);
          // Filter only complaint notifications
          const complaintNotifications = notifications
            .filter((notif) => notif.type === "complaint")
            .map((notif) => ({
              id: notif.id,
              title:
                notif.title.replace("Complaint Submitted", "").trim() ||
                "Complaint",
              name: "You",
              date: new Date(notif.timestamp).toLocaleDateString("en-IN"),
              status: notif.status || "Pending",
              color:
                notif.status === "Pending"
                  ? "orange"
                  : notif.status === "In Progress"
                    ? "blue"
                    : "green",
              description: notif.message,
              timestamp: notif.timestamp,
            }));

          // Combine default complaints with submitted ones
          const combined = [
            ...complaintNotifications,
            ...defaultComplaintsData,
          ];
          // Remove duplicates based on id
          const unique = Array.from(
            new Map(combined.map((item) => [item.id, item])).values(),
          );
          setAllComplaints(unique);
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setAllComplaints(defaultComplaintsData);
      }
    };

    fetchSubmittedComplaints();
    // Refresh every 3 seconds to show new complaints
    const interval = setInterval(fetchSubmittedComplaints, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredData = allComplaints.filter((item) => {
    const matchesTab = activeTab === "All" || item.status === activeTab;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Submit Complaint
  const submitComplaint = async () => {
    if (!complaintTitle || !complaintDescription) {
      alert("Please fill all required fields!");
      return;
    }

    setSubmitting(true);

    try {
      // Create notification object
      const notification = {
        id: Date.now(),
        type: "complaint",
        title: "Complaint Submitted",
        message: `Your complaint "${complaintTitle}" has been successfully submitted. Status: Pending`,
        status: "Pending",
        timestamp: new Date().toISOString(),
        isRead: false,
      };

      // Get existing notifications from localStorage
      const existingNotifications = localStorage.getItem("notifications");
      const notifications = existingNotifications
        ? JSON.parse(existingNotifications)
        : [];

      // Add new notification
      notifications.push(notification);
      localStorage.setItem("notifications", JSON.stringify(notifications));

      // Create complaint object for display
      const newComplaint = {
        id: notification.id,
        title: complaintTitle,
        name: "You",
        date: new Date().toLocaleDateString("en-IN"),
        status: "Pending",
        color: "orange",
        description: complaintDescription,
      };

      // Add to complaints list
      setAllComplaints([newComplaint, ...allComplaints]);

      // Reset form and close modal
      setTimeout(() => {
        setComplaintTitle("");
        setComplaintDescription("");
        setShowModal(false);
        alert("✓ Complaint submitted successfully!");
      }, 1000);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Error submitting complaint. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="font-sans ">
      <UsersNavbar />

      <div className="grid grid-cols-3 align-middle items-center border p-5">
        <div className="flex gap-2 col-start-2 w-full items-center text-lg">
          <BackClick />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-message-square w-5 h-5 text-primary"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Complaints List
        </div>
        <div className="grid col-start-3 w-full">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-900 text-white w-fit px-4 py-2 rounded-2xl hover:bg-blue-950 transition"
          >
            + New Complaint
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Tabs */}
        <div className="flex gap-3">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition
              ${
                activeTab === tab
                  ? "bg-blue-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border p-5 flex justify-between items-center hover:shadow-md transition"
              >
                {/* Left */}
                <div className="space-y-1 flex-grow">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    {item.name} • {item.date}
                  </p>

                  {item.description && (
                    <p className="text-sm text-gray-600 mt-2">
                      {item.description}
                    </p>
                  )}

                  {item.status !== "Completed" && (
                    <div className="flex gap-3 mt-3">
                      <button className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                        ↗ Forward
                      </button>
                      <button className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                        💬 Add Comment
                      </button>

                      {item.status === "In Progress" && (
                        <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                          ✔ Mark Completed
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Right */}
                <div className="flex items-center gap-3 ml-4">
                  <span
                    className={`px-4 py-1 text-sm rounded-full whitespace-nowrap
                    ${item.color === "orange" && "bg-orange-100 text-orange-600"}
                    ${item.color === "blue" && "bg-blue-100 text-blue-600"}
                    ${item.color === "green" && "bg-green-100 text-green-600"}
                  `}
                  >
                    {item.status}
                  </span>
                  <span className="text-xl text-gray-400">›</span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm border p-8 text-center text-gray-500">
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
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <p className="text-lg font-medium">No complaints found</p>
              <p className="text-sm mt-2">
                Submit a new complaint to get started
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Submit Complaint Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Submit New Complaint</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Complaint Title
                </label>
                <input
                  type="text"
                  value={complaintTitle}
                  onChange={(e) => setComplaintTitle(e.target.value)}
                  placeholder="Enter complaint title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={complaintDescription}
                  onChange={(e) => setComplaintDescription(e.target.value)}
                  placeholder="Describe your complaint in detail..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={submitComplaint}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition font-medium disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Complaints;
