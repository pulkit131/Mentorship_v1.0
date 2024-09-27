import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Footer from "./components/Footer";
import DivSlider from "./components/DivSlider";
import Register from '../src/pages/Register';
import Dashboard from '../src/pages/Dashboard';
import Products from '../src/pages/Product';
import Layout from "./components/shared/Layout";
import Orders from "./components/Orders";
import Customer from "./components/Customer";
import ContactUs from "./ContactUs";
import NewsSection from "./components/News";

function App() {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/FAQ" element={<Products />} />
          <Route path="/team" element={<Orders />} />
          <Route path="/overview" element={<Customer />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/news" element={<NewsSection />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
      {location.pathname === "/" && <DivSlider />}

      <Footer />
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
