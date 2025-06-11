import React from "react";

const MentorsID = () => {
  const mentorID = "#0001";

  return (
    <div id="mentors-user" className="min-w-screen overflow-hidden p-3">
      <h1 className="font-medium text-[24px]">Your Upcoming Sessions</h1>
      <h1 className="font-medium text-[16px]">Mentor ID: {mentorID}</h1>
      <div id="booking-cards" className="flex flex-col gap-3 mt-4 md:flex-row">
        <div className="flex flex-row justify-between h-30 p-3 w-full border border-gray-500 shadow-md rounded-xl cursor-pointer hover:-translate-y-2 transition-all">
          <div
            id="booking-details"
            className="flex flex-col gap-3 items-start "
          >
            <h1 className="text-2xl">Tom</h1>
            <p>Time: 10:00 AM</p>
          </div>
        </div>
        <div className="flex flex-row justify-between h-30 p-3 w-full border border-gray-500 shadow-md rounded-xl cursor-pointer hover:-translate-y-2 transition-all">
          <div
            id="booking-details"
            className="flex flex-col gap-3 items-start "
          >
            <h1 className="text-2xl">Kurt</h1>
            <p>Time: 2:00 PM</p>
          </div>
        </div>
        <div className="flex flex-row justify-between h-30 p-3 w-full border border-gray-500 shadow-md rounded-xl cursor-pointer hover:-translate-y-2 transition-all">
          <div
            id="booking-details"
            className="flex flex-col gap-3 items-start "
          >
            <h1 className="text-2xl">Jake</h1>
            <p>Time: 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorsID;
