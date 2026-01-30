import { useEffect, useState } from "react";
import api from "@/services/axiosInstance";

const Dashboard = () => {
  const [policeStations, setPoliceStations] = useState([]);
  const [policePatils, setPolicePatils] = useState([]);
  const [stats, setStats] = useState({
    users: 0,
    stations: 0,
    villages: 0,
    reports: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, policeStationsRes, usersRes] = await Promise.all([
          api.get("/admin/dashboard-stats"),
          api.get("/admin/police-stations"),
          api.get("/admin/users"),
        ]);
        setStats(statsRes.data);
        setPoliceStations(policeStationsRes.data);
        setPolicePatils(usersRes.data.filter(user => user.role === 'police_patil'));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-5 rounded-lg shadow-md text-center"
          >
            <p className="uppercase text-sm opacity-90">{key}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-4">Police Stations & Assigned Police Patils</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {policeStations.map(station => (
          <div key={station.station_id} className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h4 className="text-xl font-semibold text-blue-800 mb-3">{station.station_name}</h4>
            <p className="text-blue-700 text-sm mb-4">{station.address || "Address not available"}</p>
            <h5 className="text-md font-medium text-blue-600 mb-2">Assigned Police Patils:</h5>
            {
              policePatils.filter(patil => patil.police_station_id === station.station_id).length > 0 ? (
                <ul className="list-disc list-inside text-blue-700 space-y-1">
                  {policePatils.filter(patil => patil.police_station_id === station.station_id).map(patil => (
                    <li key={patil.user_id}>{patil.first_name} {patil.last_name} ({patil.phone})</li>
                  ))}
                </ul>
              ) : (
                <p className="text-blue-600 italic">No Police Patils assigned.</p>
              )
            }
          </div>
        ))}
        {policeStations.length === 0 && (
          <p className="text-gray-500 md:col-span-3">No police stations found.</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
