import React from "react";

function HeroSection({ onButtonClick }) {
  return (
    <div className="bg-[#6A9DF0] p-20 h-60 w-29  flex items-center justify-start rounded-2xl hover:scale-105 transition ease-in-out duration-300 hover:bg-[#6A9AC0]">

      <div className="relative max-w-5xl px-8">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-40 bg-[#001F3F] shadow-[0_0_15px_rgba(34,197,94,0.8)]"></div>
        <div className="ml-8">
          <h1 className="text-5xl font-bold text-[#001F3F]">Estimate the chiller plant load</h1>

          <p className="text-xl text-black mt-4 text-[#001F3F]">AI-powered solution for precise load prediction, pump optimizer and fault detection.</p>
          <p className="text-xl text-black mt-4 text-[#001F3F]">
          <p>Optimize energy consumption and enhance efficiency!<button className=" ml-2 bg-[#001F3F] text-white rounded-2xl p-3 text-sm" onClick={onButtonClick}>Let's start</button></p>
          
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardStatsGrid({ onButtonClick }) {
  return (
    <>
      <HeroSection onButtonClick={onButtonClick}/>
    </>
  );
}
