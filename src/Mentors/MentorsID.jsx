import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import MentorBookingCard from "../Dashboard/MentorBookingCard";

const MentorDashboard = () => {
  const { id: mentorId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      try {
        const mentorRef = doc(db, "mentors", mentorId);
        const mentorSnap = await getDoc(mentorRef);
        if (mentorSnap.exists()) {
          const data = mentorSnap.data();
          if (data.isBooked) {
            setSession({ bookedBy: data.bookedBy });
          } else {
            setSession(null);
          }
        } else {
          setSession(null);
        }
      } catch (error) {
        console.error("Error fetching mentor session:", error);
      }
      setLoading(false);
    };

    fetchSession();
  }, [mentorId]);

  const handleDelete = async () => {
    try {
      const mentorRef = doc(db, "mentors", mentorId);
      await updateDoc(mentorRef, {
        isBooked: false,
        bookedBy: "",
      });
      setSession(null);
    } catch (error) {
      console.error("Error resetting booking:", error);
    }
  };

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 tracking-tight">
          Bookings for the selected mentor :
        </h1>
        <div className="flex flex-col md:flex-row flex-wrap gap-6">
         {session ? (
            <MentorBookingCard
              name={session.bookedBy || "Unknown"}
              onDelete={handleDelete}
            />
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
