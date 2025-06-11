import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ChevronDown } from "lucide-react";
import { User, Phone, AtSign } from "lucide-react";
import Swal from "sweetalert2";
import { auth, provider, db } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const mentors = ["Sarah Johnson", "Mike Chen", "Emily Rodriguez", "David Kim"];
const mentorMap = {
  "Sarah Johnson": "sarah-01",
  "Mike Chen": "mike-01",
  "Emily Rodriguez": "emily-01",
  "David Kim": "david-01",
};
const timeMap = {
  "10:00 AM": "10am",
  "2:00 PM": "2pm",
  "6:00 PM": "6pm",
};

const BookSessionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    mentor: "",
    time: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mentorId = mentorMap[formData.mentor];
    const slotId = timeMap[formData.time];

    if (!mentorId || !slotId) {
      Swal.fire({
        title: "Incomplete Selection",
        text: "Please select both mentor and time slot.",
        icon: "warning",
        confirmButtonText: "Okay",
      });
      return;
    }

    const slotRef = doc(db, "mentors", mentorId, "slots", slotId);
    const slotSnap = await getDoc(slotRef);

    if (!slotSnap.exists()) {
      Swal.fire({
        title: "Slot Error",
        text: "Selected slot does not exist. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
      return;
    }
    const slotData = slotSnap.data();
    if (slotData.isBooked) {
      Swal.fire({
        title: "Slot Already Booked",
        text: "Please select a different time slot.",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }

    try {
      await updateDoc(slotRef, {
        isBooked: true,
        bookedBy: formData.email,
      });
      await addDoc(collection(db, "users"), formData);
      localStorage.setItem("userEmail", formData.email);
      Swal.fire({
        title: "Session Booked!",
        text: "Your session has been successfully reserved.",
        icon: "success",
        confirmButtonText: "Awesome!",
      });
      setFormData({ name: "", contact: "", email: "", mentor: "", time: "" });
      navigate("/mydashboard");
    } catch (err) {
      Swal.fire({
        title: "Booking Failed",
        text: err.message,
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  const handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setFormData((prev) => ({
          ...prev,
          name: user.displayName || "",
          email: user.email || "",
        }));
        localStorage.setItem("isAuth", true);
        localStorage.setItem("userEmail", user.email);
        Swal.fire({
          title: "Logged In Successfully",
          icon: "success",
          confirmButtonText: "Cool!",
        });
      })
      .catch(() => {
        Swal.fire({
          title: "Login Failed",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-white px-2">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mt-8 mb-2">
          Book Your Free Session
        </h1>
        <p className="text-green-700 text-center mb-8 text-base sm:text-lg">
          Take the first step towards your dream career. Book a free mentorship
          session today
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-lg px-4 sm:px-8 py-8 flex flex-col gap-4"
        >
          {/* Name and Contact */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                name="name"
                placeholder="Enter your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-2 border-black rounded-lg px-4 py-3 text-base outline-none pl-12"
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="relative flex-1">
              <input
                type="text"
                name="contact"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
                className="w-full border-2 border-black rounded-lg px-4 py-3 text-base outline-none pl-12"
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Email and Socials */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-2 border-black rounded-lg px-4 py-3 text-base outline-none pl-12"
              />
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                type="button"
                onClick={handleGoogle}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                title="Sign in with Google"
              >
                <FcGoogle className="w-6 h-6" />
              </button>
              <button
                type="button"
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
              >
                <FaApple className="w-6 h-6" />
              </button>
              <button
                type="button"
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
              >
                <MdEmail className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mentor and Timings */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <select
                name="mentor"
                value={formData.mentor}
                onChange={handleChange}
                className="w-full border-2 border-black rounded-lg px-4 py-3 text-base appearance-none outline-none"
              >
                <option value="">Select Mentor</option>
                {mentors.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <div className="flex-1 relative">
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full border-2 border-black rounded-lg px-4 py-3 text-base appearance-none outline-none"
              >
                <option value="">Select Timings</option>
                <option>10:00 AM</option>
                <option>2:00 PM</option>
                <option>6:00 PM</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg py-3 mt-2 transition"
          >
            Book Now
          </button>
          <p className="text-center text-gray-700 text-sm mt-2">
            No Registration Required | Completely Free | 1-Hour interactive
            Session
          </p>
        </form>
      </div>
    </div>
  );
};

export default BookSessionForm;
