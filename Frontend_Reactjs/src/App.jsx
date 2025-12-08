import { useState } from "react";


import "./App.css";
import Home from "./component/Home";
import Login from "./component/Login";




function App() {
  const [count, setCount] = useState(0);

  return (
    <>
<Home/>
{/* <Login/> */}
   
    </>
  );
}

export default App;
