import React, { useEffect } from "react";
import { useSessionStore } from "../store/useSessionStore";
import BookingCard from "./UserBookingCard";

const Dashboard = () => {
  const userEmail = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userId"); 

  const { sessions, isLoading, getSessionsByUser } = useSessionStore();

  useEffect(() => {
    if (userId) {
      getSessionsByUser(userId);
    }
  }, [userId]);

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 tracking-tight">
          Your Upcoming Sessions :
        </h1>

        {isLoading ? (
          <p className="text-lg text-gray-500">Loading...</p>
        ) : sessions.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-12">
            <p className="text-lg text-gray-500">No upcoming sessions.</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row flex-wrap gap-6">
            {sessions.map((session) => (
              <BookingCard
                key={session._id}
                name={session.mentorName || "Mentor"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
