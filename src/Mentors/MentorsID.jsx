import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import MentorBookingCard from "../Dashboard/MentorBookingCard"
const mentorMap = {
  // "Sarah Johnson": "sarah-01",
  "Ravi Kumar": "mike-01",
  "Navyaa Sharma": "emily-01",
  "Hameedullah Khan Pathan":"david-01",
};

const idToMentorName = Object.fromEntries(
  Object.entries(mentorMap).map(([name, id]) => [id, name])
);
const MentorDashboard = () => {
  const { id: mentorId } = useParams();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const mentorName = idToMentorName[mentorId];

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        if (!mentorName) {
          setSessions([]);
          setLoading(false);
          return;
        }

        const slotsRef = collection(db, "mentors", mentorId, "slots");
        const snapshot = await getDocs(slotsRef);
        const bookedSessions = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((slot) => slot.isBooked);

        setSessions(bookedSessions);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
      setLoading(false);
    };

    fetchSessions();
  }, [mentorId, mentorName]);

  // const handleDelete = async (slotId) => {
  //   try {
  //     const slotRef = doc(db, "mentors", mentorId, "slots", slotId);
  //     await updateDoc(slotRef, {
  //       isBooked: false,
  //       bookedBy: "",
  //     });
  //     setSessions((prev) => prev.filter((session) => session.id !== slotId));
  //   } catch (error) {
  //     console.error("Error unbooking slot:", error);
  //   }
  // };

  if (!mentorName) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-600">
        Invalid mentor ID.
      </div>
    );
  }

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 tracking-tight">
          Bookings for {mentorName}
        </h1>
        <div className="flex flex-col md:flex-row flex-wrap gap-6">
          {sessions.map((session) => (
            <MentorBookingCard
              key={session.id}
              name={session.bookedBy || "Unknown"}
               time={session.id}
              onDelete={() => handleDelete(session.id)}
            />
          ))}
          {sessions.length === 0 && (
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
