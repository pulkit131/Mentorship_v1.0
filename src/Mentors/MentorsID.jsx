import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSessionStore } from "../store/useSessionStore";
import MentorBookingCard from "../Dashboard/MentorBookingCard";

const MentorDashboard = () => {
  const { id: mentorId } = useParams();
  const { sessions, isLoading, getSessionsByMentor } = useSessionStore();

  useEffect(() => {
    if (mentorId) {
      getSessionsByMentor(mentorId);
    }
  }, [mentorId]);

  if (isLoading) return <p className="p-5">Loading...</p>;

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 tracking-tight">
          Bookings for the selected mentor:
        </h1>
        <div className="flex flex-col md:flex-row flex-wrap gap-6">
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <MentorBookingCard
                key={session.id}
                name={session.user?.name || "Unknown"}
                date={session.timeSlot}
                userEmail={session.user?.email}
                status={session.status}
                // onDelete={...} // Add if you implement delete
              />
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center py-12">
              <p className="text-lg text-gray-500">No booked sessions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
