import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { ChevronDown } from "lucide-react";
import { User, Phone, AtSign } from "lucide-react";

const mentors = [
  "Sarah Johnson",
  "Mike Chen",
  "Emily Rodriguez",
  "David Kim",
];

const BookSessionForm = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-white px-2">
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mt-8 mb-2">Book Your Free Session</h1>
      <p className="text-green-700 text-center mb-8 text-base sm:text-lg">
        Take the first step towards your dream career. Book a free mentorship session today
      </p>
      <form className="bg-white rounded-3xl shadow-lg px-4 sm:px-8 py-8 flex flex-col gap-4">
        {/* Name and Contact */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full border-2 border-black rounded-lg px-4 py-3 text-base outline-none pl-12"
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Contact Number"
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
              placeholder="Email address"
              className="w-full border-2 border-black rounded-lg px-4 py-3 text-base outline-none pl-12"
            />
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button type="button" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition" title="Sign in with Google">
              <FcGoogle className="w-6 h-6" />
            </button>
            <button type="button" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition" title="Sign in with Apple">
              <FaApple className="w-6 h-6" />
            </button>
            <button type="button" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition" title="Sign in with Email">
              <MdEmail className="w-6 h-6" />
            </button>
          </div>
        </div>
        {/* Mentor and Timings */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <select className="w-full border-2 border-black rounded-lg px-4 py-3 text-base appearance-none outline-none">
              <option>Select Mentor</option>
              {mentors.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
          <div className="flex-1 relative">
            <select className="w-full border-2 border-black rounded-lg px-4 py-3 text-base appearance-none outline-none">
              <option>Select Timings</option>
              <option>10:00 AM</option>
              <option>2:00 PM</option>
              <option>6:00 PM</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
        {/* Book Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg py-3 mt-2 transition"
        >
          Book Now
        </button>
        <p className="text-center text-gray-700 text-sm mt-2">
          No Registration Required | Completely Free | 1-Hour interactive Session
        </p>
      </form>
    </div>
  </div>
);

export default BookSessionForm;
