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

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [p, s, v] = await Promise.all([
          api.get("/admin/getallcategories"),
          api.get("/admin/getallpolicestation"),
          api.get("/admin/getallvillages"),
        ]);

        setPatils(p.data);
        setStations(s.data);
        setVillages(v.data);
      } catch (err) {
        setError("Failed to load assignment data");
      }
    };

    fetchData();
  }, []);

  /* ---------------- HANDLE CHANGE ---------------- */

  const handleVillageSelect = (id) => {
    setForm((prev) => ({
      ...prev,
      villageIds: prev.villageIds.includes(id)
        ? prev.villageIds.filter((v) => v !== id)
        : [...prev.villageIds, id],
    }));
  };

  /* ---------------- SUBMIT ---------------- */

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

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Assignments</h2>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        {/* Police Patil */}
        <select
          className="w-full border p-2 rounded"
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

        {/* Police Station */}
        <select
          className="w-full border p-2 rounded"
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

        {/* Villages */}
        <div className="border rounded p-4 max-h-60 overflow-y-auto">
          <p className="font-semibold mb-2">Select Villages</p>

          {villages.map((v) => (
            <label key={v.village_id} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={form.villageIds.includes(v.village_id)}
                onChange={() => handleVillageSelect(v.village_id)}
              />
              {v.village_name} ({v.taluka})
            </label>
          ))}
        </div>

        <button
          disabled={loading}
          className="bg-blue-700 text-white px-6 py-2 rounded"
        >
          {loading ? "Assigning..." : "Save Assignment"}
        </button>
      </form>
    </div>
  );
};

export default Assignments;
