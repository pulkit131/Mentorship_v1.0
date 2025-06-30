import React from "react";
import TickBox from "../assets/TickBox.png";

const PremiumPlan = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-2 sm:px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4 text-center">
        Upgrade to Premium
      </h1>
      <p className="text-xl sm:text-lg text-black text-center mb-8 font-medium">
        Get unlimited access to mentors, priority booking, and exclusive
        resources.
      </p>
<div className="bg-[#dbeafe] rounded-[32px] sm:rounded-[43px] w-full max-w-md sm:max-w-lg flex flex-col items-center px-4 sm:px-8 pt-8 pb-6 justify-between shadow-2xl">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-black mb-1">
            Premium Plan
          </h2>
          <div className="flex items-start justify-center gap-1">
            <p className="text-3xl sm:text-4xl font-bold text-gray-600 line-through">₹1100</p>
            <span className="text-xl sm:text-2xl text-black mt-3">/</span>
            <p className="text-2xl sm:text-3xl font-bold text-[#0025f6] mt-3">₹599</p>
          </div>
          <p className="text-xs sm:text-sm text-black mb-1">per month</p>
        </div>
        <div className="flex flex-col gap-2 w-full px-1 mt-3">
          {[
            "Unlimited mentorship sessions",
            "Priority booking & support",
            "Access to exclusive resources",
            "Resume review & mock interviews",
          ].map((text, index) => (
            <div
              key={index}
              className="flex items-start gap-3 text-black text-sm sm:text-base font-medium"
            >
              <img src={TickBox} alt="TickBox" className="w-6 h-8" />
              <span>{text}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center w-full mt-7">
          <button className="w-full sm:w-[90%] h-12 sm:h-[56px] bg-[#155efb] text-white rounded-xl font-semibold mb-2 text-lg sm:text-2xl leading-tight hover:bg-[#1346c2] transition duration-300">
            Subscribe Now
          </button>
          <p className="text-xs font-semibold text-black text-center mt-1">
            Secure payment powered by Razorpay | Early bird offer
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlan;