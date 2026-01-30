import { useEffect, useState } from "react";
import api from "@/services/axiosInstance";

const emptyForm = {
  village_name: "",
  district: "",
  taluka: "",
};

const Villages = () => {
  const [villages, setVillages] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchVillages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/villages");
      setVillages(res.data);
    } catch (err) {
      console.error("Error fetching villages:", err.response?.data || err.message);
      setError("Failed to fetch villages: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVillages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.village_name || !form.district || !form.taluka) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/admin/villages", form);
      setSuccess("Village added successfully");
      setForm(emptyForm);
      fetchVillages();
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to add village");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Village Management</h2>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Village Name"
          value={form.village_name}
          onChange={(e) => setForm({ ...form, village_name: e.target.value })}
        />
        <input
          className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="District"
          value={form.district}
          onChange={(e) => setForm({ ...form, district: e.target.value })}
        />
        <input
          className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Taluka"
          value={form.taluka}
          onChange={(e) => setForm({ ...form, taluka: e.target.value })}
        />

        <button
          disabled={loading}
          className="md:col-span-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {loading ? "Saving..." : "Add Village"}
        </button>
      </form>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="p-3 text-left">Village Name</th>
              <th className="p-3 text-left">District</th>
              <th className="p-3 text-left">Taluka</th>
            </tr>
          </thead>
          <tbody>
            {villages.map((village) => (
              <tr key={village.village_id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-3">{village.village_name}</td>
                <td className="p-3">{village.district}</td>
                <td className="p-3">{village.taluka}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && villages.length === 0 && (
          <p className="p-4 text-center text-gray-500">No villages found</p>
        )}
      </div>
    </div>
  );
};

export default Villages;
