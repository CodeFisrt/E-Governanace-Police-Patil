import { useEffect, useState } from "react";
import api from "@/services/axiosInstance";

const emptyForm = {
  first_name: "",
  last_name: "",
  phone: "",
  role: "",
  password: "",
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ---------------- FETCH USERS ---------------- */

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/auth/getdetails");
      setUsers(res.data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ---------------- ADD USER ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !form.first_name ||
      !form.last_name ||
      !form.phone ||
      !form.role ||
      !form.password
    ) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        password_hash: form.password,
        role: form.role,
      });

      setSuccess("User created successfully");
      setForm(emptyForm);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">User Management</h2>

      {/* Messages */}
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      {/* Add User Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="First Name"
            className="border p-2 rounded"
            value={form.first_name}
            onChange={(e) =>
              setForm({ ...form, first_name: e.target.value })
            }
          />

          <input
            placeholder="Last Name"
            className="border p-2 rounded"
            value={form.last_name}
            onChange={(e) =>
              setForm({ ...form, last_name: e.target.value })
            }
          />

          <input
            placeholder="Phone"
            className="border p-2 rounded"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <select
            className="border p-2 rounded"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="police_patil">Police Patil</option>
            <option value="police_officer">Police Station</option>
          </select>

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <button
          disabled={loading}
          className="bg-blue-700 text-white px-6 py-2 rounded"
        >
          {loading ? "Saving..." : "Create User"}
        </button>
      </form>

      {/* Users Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.user_id} className="border-t">
                <td className="p-3">
                  {u.first_name} {u.last_name}
                </td>
                <td className="p-3">{u.phone}</td>
                <td className="p-3 capitalize">{u.role.replace("_", " ")}</td>
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
