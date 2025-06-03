import { useState } from "react";
import "./App.css";
import Navbar from "./App/Navbar";
import Home from "./App/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="overflow-x-hidden">
        <Navbar />
        <Home />
      </div>
    </>
  );
}

export default App;
