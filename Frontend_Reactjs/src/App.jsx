import { useState } from "react";

import "./App.css";
import Login from "./pages/login/Login";
import LandingPage from "./pages/login/LandingPage";



function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Login /> */}
      <LandingPage/>
      
    </>
  );
}

export default App;
