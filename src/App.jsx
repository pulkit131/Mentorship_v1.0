import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoutes"
import Navbar from "./Home/Navbar";
import Home from "./Home/Home";
import Work from "./Home/Work";
import Mentors from "./Home/Mentors";
import FAQ from "./Home/FAQ";
import About from "./Home/About";
import BookSessionForm from "./Home/BookSessionForm";
import PremiumPlan from "./Home/PremiumPlan";
import Support from "./Home/Support";
import Subscriptions from "./Home/Subscriptions";
import Bookings from "./Dashboard/Bookings";
import MentorsID from "./Mentors/MentorsID";
import Mentorlist from "./Mentors/Mentorlist";
import Footer from "./Home/Footer";

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
              <Work />
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
<Route
  path="/subscriptions"
  element={
    <ProtectedRoute>
      <Subscriptions/>
    </ProtectedRoute>
  }
/>


      </Routes>
      
    </Router>
  );
}

export default App;
