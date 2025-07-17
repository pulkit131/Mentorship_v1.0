import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { User, Phone, AtSign } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import PremiumPlan from "../Home/PremiumPlan";

const mentors = [
  { name: "Ravi Kumar", email: "ravi.kumar@example.com" },
  { name: "Navyaa Sharma", email: "navyaa.sharma@example.com" },
  { name: "Hameedullah Khan Pathan", email: "hameedullah@example.com" },
];

const BookSessionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    mentor: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const selectedMentor = mentors.find((m) => m.name === formData.mentor);
  const mentorEmail = selectedMentor?.email;

  if (!formData.name || !formData.email || !formData.contact || !mentorEmail) {
    return Swal.fire({
      title: "Missing Fields",
      text: "Please fill in all fields and select a mentor.",
      icon: "warning",
      confirmButtonText: "Okay",
    });
  }

  try {
    await createBooking({
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      mentor: formData.mentor,
    });

    Swal.fire({
      title: "Session Booked!",
      text: "Your session has been successfully booked.",
      icon: "success",
      confirmButtonText: "Great!",
    });

    setFormData({ name: "", contact: "", email: "", mentor: "" });
    navigate("/myDashboard");

  } catch (err) {
    Swal.fire({
      title: "Booking Failed",
      text: err?.message || "Something went wrong.",
      icon: "error",
      confirmButtonText: "Retry",
    });
  }
};



  return (
    <section id="booking">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-white px-2">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
            Book Your Free Session
          </h1>
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg px-8 py-8 gap-4 flex flex-col">
            {/* Name and Contact */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your Name" className="w-full border-2 border-black rounded-lg px-4 py-3 pl-12" />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative flex-1">
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact Number" className="w-full border-2 border-black rounded-lg px-4 py-3 pl-12" />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email address" className="w-full border-2 border-black rounded-lg px-4 py-3 pl-12" />
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Mentor Dropdown */}
            <div className="relative">
              <select name="mentor" value={formData.mentor} onChange={handleChange} className="w-full border-2 border-black rounded-lg px-4 py-3 appearance-none">
                <option value="">Select Mentor</option>
                {mentors.map((m) => (
                  <option key={m.email} value={m.name}>{m.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Submit */}
            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
              Book Now
            </button>
            <p className="text-center text-sm text-gray-700 mt-2">
              No Registration Required | Completely Free | 1-Hour Interactive Session
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookSessionForm;
