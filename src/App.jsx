import { useState ,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useUserStore } from "./store/useUserStore";
import ProtectedRoute from "./Components/ProtectedRoutes";
import Navbar from "./Home/Navbar";
import Home from "./Home/Home";
import Wrapper from "./Home/Wrapper";
import Info from "./Home/Info";
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
import TermsModal from "./Home/TermsModal";
import CancellationRefundModal from "./Home/CancellationRefundModal";
import PrivacyPolicyModal from "./Home/PrivacyModal";
import ShippingPolicyModal from "./Home/ShippingPolicyModal";
import PaymentHistory from "./Home/PaymentHistory";
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    useUserStore.getState().loadUserFromLocalStorage();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="overflow-x-hidden">
              <Home />
              <Wrapper />
              <Info />
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
          path="/terms"
          element={
            <div>
              <TermsModal />
            </div>
          }
        />

        <Route
          path="/privacy"
          element={
            <div>
              <PrivacyPolicyModal />
            </div>
          }
        />

        <Route
          path="/shipping"
          element={
            <div>
              <ShippingPolicyModal />
            </div>
          }
        />

        <Route
          path="/cancellation"
          element={
            <div>
              <CancellationRefundModal />
            </div>
          }
        />
        
        <Route
          path="/paymentHistory"
          element={
            <div>
              <PaymentHistory />
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
              <Subscriptions />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
