import { useEffect, useState } from "react";
import api from "@/services/axiosInstance";

const Assignments = () => {
  const [patils, setPatils] = useState([]);
  const [stations, setStations] = useState([]);
  const [villages, setVillages] = useState([]);
  const [form, setForm] = useState({
    patilId: "",
    stationId: "",
    villageIds: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, s, v] = await Promise.all([
          api.get("/admin/users"),
          api.get("/admin/police-stations"),
          api.get("/admin/villages"),
        ]);
        setPatils(p.data.filter(user => user.role === 'police_patil'));
        setStations(s.data);
        setVillages(v.data);
      } catch (err) {
        setError("Failed to load assignment data");
      }
    };
    fetchData();
  }, []);

  const handleVillageSelect = (id) => {
    setForm((prev) => ({
      ...prev,
      villageIds: prev.villageIds.includes(id)
        ? prev.villageIds.filter((v) => v !== id)
        : [...prev.villageIds, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { patilId, stationId, villageIds } = form;

    if (!patilId || !stationId || villageIds.length === 0) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/admin/assign", {
        patil_id: patilId,
        station_id: stationId,
        village_ids: villageIds,
      });
      setSuccess("Assignment saved successfully");
      setForm({ patilId: "", stationId: "", villageIds: [] });
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to save assignment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Assignments</h2>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <select
          className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={form.patilId}
          onChange={(e) => setForm({ ...form, patilId: e.target.value })}
        >
          <option value="">Select Police Patil</option>
          {patils.map((p) => (
            <option key={p.user_id} value={p.user_id}>
              {p.first_name} {p.last_name}
            </option>
          ))}
        </select>

        <select
          className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={form.stationId}
          onChange={(e) => setForm({ ...form, stationId: e.target.value })}
        >
          <option value="">Select Police Station</option>
          {stations.map((s) => (
            <option key={s.station_id} value={s.station_id}>
              {s.station_name}
            </option>
          ))}
        </select>

        <div className="border border-gray-300 rounded-md p-4 max-h-60 overflow-y-auto bg-gray-50">
          <p className="font-semibold mb-2">Select Villages</p>
          {villages.map((v) => (
            <label key={v.village_id} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={form.villageIds.includes(v.village_id)}
                onChange={() => handleVillageSelect(v.village_id)}
                className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              {v.village_name} ({v.taluka})
            </label>
          ))}
        </div>

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {loading ? "Assigning..." : "Save Assignment"}
        </button>
      </form>
    </div>
  );
};

export default Assignments;
