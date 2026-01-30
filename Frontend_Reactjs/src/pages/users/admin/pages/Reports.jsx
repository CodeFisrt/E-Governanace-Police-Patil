import { useEffect, useState } from "react";
import api from "@/services/axiosInstance";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/reports");
      setReports(res.data);
    } catch (err) {
      console.error("Error fetching reports:", err.response?.data || err.message);
      setError("Failed to fetch reports: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Report Management</h2>

      {error && <p className="text-red-600">{error}</p>}

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="p-3 text-left">Report ID</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">Loading reports...</td>
              </tr>
            ) : reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report.report_id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-3">{report.report_id}</td>
                  <td className="p-3">{report.category_name || "N/A"}</td>
                  <td className="p-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${report.status === 'Resolved' ? 'bg-green-100 text-green-700' : report.status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}`}
                    >
                      {report.status || "N/A"}
                    </span>
                  </td>
                  <td className="p-3">{new Date(report.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">No reports found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
