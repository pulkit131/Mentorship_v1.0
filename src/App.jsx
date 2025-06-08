import { useState } from "react";
import "./App.css";
import Navbar from "./App/Navbar";
import Home from "./App/Home";
import Mentors from "./App/Mentors";
import FAQ from "./App/FAQ";
import About from "./App/About";
import BookSessionForm from "./App/BookSessionForm";
import PremiumPlan from "./App/PremiumPlan";
import Support from "./App/Support";

import { BrowserRouter } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <BrowserRouter>
      <div className="overflow-x-hidden">
        <Navbar />
        <Home />
        <Mentors />
        <BookSessionForm/>
        <PremiumPlan />
        <About/>
        <FAQ />
        <Support />
      </div></BrowserRouter>
    </>
  );
}

export default App;
