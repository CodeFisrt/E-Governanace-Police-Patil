import { useEffect, useState } from "react";
import api from "@/services/axiosInstance";

const emptyForm = {
  station_name: "",
  address: "",
  contact_number: "",
};

const PoliceStations = () => {
  const [policeStations, setPoliceStations] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchPoliceStations = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/police-stations");
      setPoliceStations(res.data);
    } catch (err) {
      console.error(
        "Error fetching police stations:",
        err.response?.data || err.message,
      );
      setError(
        "Failed to fetch police stations: " +
          (err.response?.data?.error || err.message),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoliceStations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.station_name || !form.address || !form.contact_number) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/admin/police-stations", form);
      setSuccess("Police station added successfully");
      setForm(emptyForm);
      fetchPoliceStations();
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to add police station");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Police Station Management</h2>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Station Name"
          value={form.station_name}
          onChange={(e) => setForm({ ...form, station_name: e.target.value })}
        />
        <input
          className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Contact Number"
          value={form.contact_number}
          onChange={(e) => setForm({ ...form, contact_number: e.target.value })}
        />
  
        <button
          disabled={loading}
          className="md:col-span-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {loading ? "Saving..." : "Add Police Station"}
        </button>
      </form>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="p-3 text-left">Station Name</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {policeStations.map((station) => (
              <tr
                key={station.station_id}
                className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">{station.station_name}</td>
                <td className="p-3">{station.address}</td>
                <td className="p-3">{station.contact_number}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && policeStations.length === 0 && (
          <p className="p-4 text-center text-gray-500">
            No police stations found
          </p>
        )}
      </div>
    </div>
  );
};

export default PoliceStations;
