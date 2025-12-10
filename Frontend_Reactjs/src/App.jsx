import "./App.css";
import PolicePatilDashboard from "./pages/users/policepatil/PolicePatilDashboard";
import Home from "./pages/Home";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import DailyActivity from "./pages/users/policepatil/DailyActivity";
import IncidentReport from "./pages/users/policepatil/IncidentReport";
import Complaints from "./pages/users/policepatil/Complaints";
import Attendence from "./pages/users/policepatil/Attendence";
import VillageInfo from "./pages/users/policepatil/VillageInfo";
import Notification from "./pages/users/policepatil/Notification";
import Location from "./component/location";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route
          path="/policepatildashboard"
          element={<PolicePatilDashboard />}
        />
        <Route path="/dailyactivity" element={<DailyActivity />} />
        <Route path="/incidentReport" element={<IncidentReport />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/attendence" element={<Attendence />} />
        <Route path="/villageinfo" element={<VillageInfo />} />
        <Route path="/notification" element={<Notification />} /> */}
        <Route path="/location" element={<Location />} />
      </Routes>
    </>
  );
}

export default App;
