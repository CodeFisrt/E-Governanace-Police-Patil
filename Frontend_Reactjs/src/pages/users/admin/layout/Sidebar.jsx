import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Users", path: "/admin/users" },
  { name: "Police Stations", path: "/admin/stations" },
  { name: "Villages", path: "/admin/villages" },
  { name: "Assignments", path: "/admin/assignments" },
  { name: "Reports", path: "/admin/reports" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-900 text-white">
      <div className="p-5 text-xl font-bold border-b border-blue-700">
        Admin Panel
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-200 hover:bg-blue-700"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
