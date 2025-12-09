import "./App.css";
import PolicePatilDashboard from "./pages/users/PolicePatilDashboard";

import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/users/admin/AdminDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route
          path="/policepatildashboard"
          element={<PolicePatilDashboard />}
        />
      </Routes>
    </>
  );
}

export default App;
