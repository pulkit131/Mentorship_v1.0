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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="overflow-x-hidden">
        <Navbar />
        <Home />
        <Mentors />
        <BookSessionForm/>
        <PremiumPlan />
        <About/>
        <FAQ />
<<<<<<< HEAD
=======
        <Support />
>>>>>>> 2945d261d87bf38cc2e06fa0db9b3bc96d27cb79
      </div>
    </>
  );
}

export default App;
