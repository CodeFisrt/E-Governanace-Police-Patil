const Topbar = () => {
  const userName = localStorage.getItem("userName");

  return (
    <header className="h-14 bg-white shadow flex items-center justify-between px-6 border-b border-gray-200">
      <h1 className="font-semibold text-gray-800">
        E-Governance Admin Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <span className="text-gray-700 text-sm">{userName}</span>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="text-sm text-red-600 font-medium"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
