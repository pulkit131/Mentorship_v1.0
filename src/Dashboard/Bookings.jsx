import React from "react";
import { Trash2 } from "lucide-react";

const Dashboard = () => {
  return (
    <div id="dashboard" className="min-w-screen mx-auto p-4">
      <h1 className="font-medium text-[24px]">My Bookings</h1>
      <div id="booking-cards" className="flex flex-col gap-3 mt-4 md:flex-row">
        <div className="flex flex-row justify-between h-30 p-3 w-full border border-gray-500 shadow-md rounded-xl cursor-pointer hover:-translate-y-2 transition-all">
          <div
            id="booking-details"
            className="flex flex-col gap-3 items-start "
          >
            <h1 className="text-2xl">David Kim</h1>
            <p>Time: 10:00 AM</p>
          </div>
          <button className="text-red-500 cursor-pointer hover:text-red-700">
            <Trash2 />
          </button>
        </div>
        <div className="flex flex-row justify-between h-30 p-3 w-full border border-gray-500 shadow-md rounded-xl cursor-pointer hover:-translate-y-2 transition-all">
          <div
            id="booking-details"
            className="flex flex-col gap-3 items-start "
          >
            <h1 className="text-2xl">Mike Chen</h1>
            <p>Time: 2:00 PM</p>
          </div>
          <button className="text-red-500 cursor-pointer hover:text-red-700">
            <Trash2 />
          </button>
        </div>
        <div className="flex flex-row justify-between h-30 p-3 w-full border border-gray-500 shadow-md rounded-xl cursor-pointer hover:-translate-y-2 transition-all">
          <div
            id="booking-details"
            className="flex flex-col gap-3 items-start "
          >
            <h1 className="text-2xl">Sarah Johnson</h1>
            <p>Time: 6:00 PM</p>
          </div>
          <button className="text-red-500 cursor-pointer hover:text-red-700">
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
