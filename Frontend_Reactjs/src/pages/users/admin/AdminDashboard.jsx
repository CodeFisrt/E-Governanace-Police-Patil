import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <h2>Admin Panel</h2>

      <ul>
        <li>
          <Link to="/admin/add-station">Add Police Station</Link>
        </li>
        <li>
          <Link to="/admin/add-patil">Add Police Patil</Link>
        </li>
        <li>
          <Link to="/admin/manage">Manage Assignments</Link>
        </li>
      </ul>
    </div>
  );
}
