import "./App.css";
import PolicePatilDashboard from "./component/PolicePatilDashboard";
import Home from "./component/Home";
import Login from "./component/Login";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/policepatildashboard" element={<PolicePatilDashboard />} />
      </Routes>
    </>
  );
}

export default App;
