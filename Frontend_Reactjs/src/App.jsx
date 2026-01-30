import "./App.css";
import PolicePatilDashboard from "./pages/users/policepatil/PolicePatilDashboard";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import DailyActivity from "./pages/users/policepatil/DailyActivity";
import IncidentReport from "./pages/users/policepatil/IncidentReport";
import Complaints from "./pages/users/policepatil/Complaints";
import Attendence from "./pages/users/policepatil/Attendence";
import VillageInfo from "./pages/users/policepatil/VillageInfo";
import Notification from "./pages/users/policepatil/Notification";
import PoliceStationDashboard from "./pages/users/policeStation/PoliceStationDashboard";
import AdminLayout from "./pages/users/admin/layout/AdminLayout";
import Dashboard from "./pages/users/admin/pages/Dashboard";
import Users from "./pages/users/admin/pages/Users";
import Villages from "./pages/users/admin/pages/Villages";
import PoliceStations from "./pages/users/admin/pages/PoliceStations";
import Assignments from "./pages/users/admin/pages/Assignments";
import Reports from "./pages/users/admin/pages/Reports";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/policepatildashboard"
          element={<PolicePatilDashboard />}
        />
        <Route path="/policestaion" element={<PoliceStationDashboard />} />
        <Route path="/dailyactivity" element={<DailyActivity />} />
        <Route path="/incidentReport" element={<IncidentReport />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/attendence" element={<Attendence />} />
        <Route path="/villageinfo" element={<VillageInfo />} />
        <Route path="/notification" element={<Notification />} />

        {/* admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="stations" element={<PoliceStations />} />
          <Route path="villages" element={<Villages />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
