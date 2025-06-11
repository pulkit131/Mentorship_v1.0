import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Home/Navbar";
import Home from "./Home/Home";
import Mentors from "./Home/Mentors";
import FAQ from "./Home/FAQ";
import About from "./Home/About";
import BookSessionForm from "./Home/BookSessionForm";
import PremiumPlan from "./Home/PremiumPlan";
import Support from "./Home/Support";
import Footer from "./Home/Footer";

import Bookings from "./Dashboard/Bookings";
import MentorsID from "./Mentors/MentorsID";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="overflow-x-hidden">
              <Navbar />
              <Home />
              <Mentors />
              <BookSessionForm />
              <PremiumPlan />
              <About />
              <FAQ />
              <Support />
              <Footer />
            </div>
          }
        />
        <Route
          path="/myDashboard"
          element={
            <div>
              <Bookings />
            </div>
          }
        />
        <Route
          path="/mentors"
          element={
            <div>
              <MentorsID />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
