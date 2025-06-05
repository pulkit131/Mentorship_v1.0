import React from "react";
import TickBox from "../assets/TickBox.png";

const PremiumCard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <h1 className="text-4xl font-bold text-black mb-5 text-center">
        Upgrade to Premium
      </h1>
      <p className="text-lg text-black text-center mb-10 font-medium">
        Get unlimited access to mentors, priority booking, and exclusive
        resources.
      </p>
      <div className="bg-[#dbeafe] rounded-[43px] w-[560px] h-[470px] flex flex-col items-center px-8 pt-8 pb-5 justify-between">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-black mb-1">
            Premium Plan
          </h2>
          <p className="text-4xl font-bold text-[#0025f6]">₹500</p>
          <p className="text-sm text-black mb-1">per month</p>
        </div>
        <div className="flex flex-col gap-3 w-full px-1 mt-3">
          {[
            "Unlimited mentorship sessions",
            "Priority booking & support",
            "Access to exclusive resources",
            "Resume review & mock interviews",
          ].map((text, index) => (
            <div
              key={index}
              className="flex items-start gap-3 text-black text-base font-medium"
            >
              <img src={TickBox} alt="TickBox" className="w-5 h-6 mt-1" />
              <span>{text}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center w-full mt-7">
          <button className="w-[90%] h-[56px] bg-[#155efb] text-white rounded-xl font-semibold mb-2 text-[24px] leading-tight hover:bg-[#1346c2] transition duration-300">
            Subscribe Now
          </button>
          <p className="text-xs font-semibold text-black text-center mt-1">
            Secure payment powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlan;
