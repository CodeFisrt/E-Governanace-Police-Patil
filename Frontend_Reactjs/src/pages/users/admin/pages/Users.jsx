import { useEffect, useState } from "react";
import api from "@/services/axiosInstance";
import { Link } from "react-router-dom";

const emptyForm = {
  first_name: "",
  last_name: "",
  phone: "",
  password_hash: "",
  role: "",
  police_station_id: "",
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [policeStations, setPoliceStations] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
      setError(
        "Failed to fetch users: " + (err.response?.data?.error || err.message),
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchPoliceStations = async () => {
    try {
      const res = await api.get("/admin/police-stations");
      setPoliceStations(res.data);
    } catch (err) {
      console.error(
        "Error fetching police stations:",
        err.response?.data || err.message,
      );
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPoliceStations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const {
      first_name,
      last_name,
      phone,
      password_hash,
      role,
      police_station_id,
    } = form;

    if (!first_name || !last_name || !phone || !password_hash || !role) {
      setError("All fields are required");
      return;
    }

    if (role === "police_patil" && !police_station_id) {
      setError("Police Station is required for Police Patil role");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/admin/users", {
        first_name,
        last_name,
        phone,
        password_hash,
        role,
        police_station_id,
      });

      console.log(res.data);

      setSuccess("User created successfully");
      setForm(emptyForm);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to create user");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">User Management</h2>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="First Name"
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
        />
        <input
          className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Last Name"
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
        />
        <input
          className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="password_hash"
          className="border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="password_hash"
          value={form.password_hash}
          onChange={(e) => setForm({ ...form, password_hash: e.target.value })}
        />
        <select
          className="border border-gray-300 p-2 rounded-md md:col-span-2 focus:ring-blue-500 focus:border-blue-500"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="">Select Role</option>
          <option value="admin">Administrator</option>
          <option value="police_officer">Police Station</option>
          <option value="police_patil">Police Patil</option>
        </select>

        {form.role === "police_patil" && (
          <select
            className="border border-gray-300 p-2 rounded-md md:col-span-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.police_station_id}
            onChange={(e) =>
              setForm({ ...form, police_station_id: e.target.value })
            }
          >
            <option value="">Select Police Station</option>
            {policeStations.map((station) => (
              <option key={station.station_id} value={station.station_id}>
                {station.station_name}
              </option>
            ))}
          </select>
        )}
        {form.role === "police_officer" && (
          <select
            className="border border-gray-300 p-2 rounded-md md:col-span-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.police_station_id}
            onChange={(e) =>
              setForm({ ...form, police_station_id: e.target.value })
            }
          >
            <option value="">Select Police Station</option>
            {policeStations.map((station) => (
              <option key={station.station_id} value={station.station_id}>
                {station.station_name}
              </option>
            ))}
          </select>
        )}

        <button
          disabled={loading}
          className="md:col-span-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {loading ? "Saving..." : "Add User"}
        </button>
      </form>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.user_id}
                className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="p-3">
                  {u.first_name} {u.last_name}
                </td>
                <td className="p-3">{u.phone}</td>
                <td className="p-3 capitalize">{u.role.replace("_", " ")}</td>
                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${u.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {u.is_active ? "Active" : "Disabled"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && users.length === 0 && (
          <p className="p-4 text-center text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
};

export default Users;
