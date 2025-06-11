import React, { useEffect, useRef, useState } from "react";
import {
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import BookingCard from "./UserBookingCard";
import Swal from "sweetalert2";
const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const postRef = useRef(collection(db, "users"));
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const getUserBookings = async () => {
      if (!userEmail) return;
      setLoading(true);
      const q = query(postRef.current, where("email", "==", userEmail));
      const data = await getDocs(q);
      setBookings(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setLoading(false);
    };
    getUserBookings();
  }, [userEmail]);

  // const handleDelete = async (id) => {
  //   await deleteDoc(doc(db, "users", id));
  //   setBookings((prev) => prev.filter((booking) => booking.id !== id));
  // };
  const mentorMap = {
    "Sarah Johnson": "sarah-01",
    "Mike Chen": "mike-01",
    "Emily Rodriguez": "emily-01",
    "David Kim": "david-01",
  };
  const convertToSlotId = (time) => {
    const lower = time.toLowerCase().replace(/\s+/g, ""); // "10:00 am" → "10:00am"
    if (lower.includes("10")) return "10am";
    if (lower.includes("2")) return "2pm";
    if (lower.includes("6")) return "6pm";
    return null;
  };

  const handleDelete = async (booking) => {
    const { id, mentor, time } = booking;

    if (!mentor || !time) {
      console.error("Invalid booking data:", booking);
      return;
    }

    const mentorId = mentorMap[mentor];
    if (!mentorId) {
      console.error(`No mentorId found for mentor: ${mentor}`);
      return;
    }

    const slotId = convertToSlotId(time);

    if (!slotId) {
      console.error(`Invalid time format: ${time}`);
      return;
    }

    try {
      // 1. Delete booking from users collection
      await deleteDoc(doc(db, "users", id));

      // 2. Reset mentor's slot
      const slotRef = doc(db, "mentors", mentorId, "slots", slotId);
      await updateDoc(slotRef, {
        isBooked: false,
        bookedBy: "",
      });

      // 3. Update UI
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 tracking-tight">
          Your Upcoming Sessions :
        </h1>
        <div className="flex flex-col md:flex-row flex-wrap gap-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              name={booking.mentor}
              time={booking.time}
              onDelete={() => handleDelete(booking)}
            />
          ))}
          {bookings.length === 0 && (
            <div className="w-full flex flex-col items-center justify-center py-12">
              <p className="text-lg text-gray-500">No upcoming sessions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
