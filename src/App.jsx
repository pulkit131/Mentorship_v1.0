import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoutes"
import Navbar from "./Home/Navbar";
import Home from "./Home/Home";
import Mentors from "./Home/Mentors";
import FAQ from "./Home/FAQ";
import About from "./Home/About";
import BookSessionForm from "./Home/BookSessionForm";

import Support from "./Home/Support";

import Bookings from "./Dashboard/Bookings";
import MentorsID from "./Mentors/MentorsID";
import Mentorlist from "./Mentors/Mentorlist";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="overflow-x-hidden">
              <Home />
              <Mentors />
              <BookSessionForm />

              <About />
              <FAQ />
              <Support />
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
    <ProtectedRoute>
      <Mentorlist />
    </ProtectedRoute>
  }
/>

<Route
  path="/mentors/:id"
  element={
    <ProtectedRoute>
      <MentorsID />
    </ProtectedRoute>
  }
/>

      </Routes>
    </Router>
  );
}

export default App;
