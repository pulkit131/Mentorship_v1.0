import { useState } from "react";
import "./App.css";
import Navbar from "./App/Navbar";
import Home from "./App/Home";
import Mentors from "./App/Mentors";
import FAQ from "./App/FAQ";
import About from "./App/About";
import BookSessionForm from "./App/BookSessionForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="overflow-x-hidden">
        <Navbar />
        <Home />
        <Mentors />
        <BookSessionForm/>
        <FAQ />
        <About/>
      </div>
    </>
  );
}

export default App;
