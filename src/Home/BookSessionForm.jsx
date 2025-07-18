import React, { useState, useEffect } from "react";
import { ChevronDown, User, Phone, AtSign } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useBookingStore } from "../store/useBookingStore"; // import your store function
import { useMentorStore } from "../store/useMentorStore";

const BookSessionForm = () => {
  const navigate = useNavigate();
  const createBooking = useBookingStore((state) => state.createBooking); // get createBooking from store
  const { mentors, fetchMentors, isLoading: mentorsLoading } = useMentorStore();

  useEffect(() => {
    fetchMentors();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    mentor: "",
    timeSlot: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mentorId = formData.mentor;
    const userId = localStorage.getItem("userId");

    //check if mentorId is a number, and if userId is a number
    console.log(mentorId, userId, formData.timeSlot);

    if (!formData.name || !formData.email || !formData.contact || !mentorId) {
      return Swal.fire({
        title: "Missing Fields",
        text: "Please fill in all fields and select a mentor.",
        icon: "warning",
        confirmButtonText: "Okay",
      });
    }

    try {
      await createBooking({
        userId,
        mentorId,
        timeSlot: new Date().toISOString(),
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
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your Name"
                  className="w-full border-2 border-black rounded-lg px-4 py-3 pl-12"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="w-full border-2 border-black rounded-lg px-4 py-3 pl-12"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full border-2 border-black rounded-lg px-4 py-3 pl-12"
              />
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Mentor Dropdown */}
            <div className="relative">
              <select
                name="mentor"
                value={formData.mentor}
                onChange={handleChange}
                className="w-full border-2 border-black rounded-lg px-4 py-3 appearance-none"
                disabled={mentorsLoading}
              >
                <option value="">Select Mentor</option>
                {mentors.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.email})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
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
