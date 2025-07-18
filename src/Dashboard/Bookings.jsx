import { useEffect, useState } from "react";
import { useBookingStore } from "../store/useBookingStore";
import BookingCard from "./UserBookingCard";

const MyBookings = () => {
  const { booking, getBookingByUser, isLoading } = useBookingStore();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      getBookingByUser(storedUserId);
    }
  }, []);

  const bookingsArray = Array.isArray(booking)
    ? booking
    : booking
    ? [booking]
    : [];

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center p-6">
      {/* Header section - outside the box, left-aligned */}
      <div className="w-full max-w-5xl mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-left">
          Dashboard
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-0 text-left">
          Keep track of your upcoming classes and mentorship sessions. 
        </p>
      </div>

      {/* Main content box - centered */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 tracking-tight">
          Your Upcoming Sessions :
        </h1>
        <div className="flex flex-col md:flex-row flex-wrap gap-6">
          {isLoading ? (
            <div className="w-full flex justify-center items-center py-12">
              <p className="text-lg text-gray-400">Loading your bookings...</p>
            </div>
          ) : bookingsArray.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center py-12">
              <p className="text-lg text-gray-500">No upcoming sessions.</p>
            </div>
          ) : (
            bookingsArray.map((b, idx) => (
              <BookingCard
                key={b.id || idx}
                name={b.mentor?.name}
                date={b.timeSlot}
                status={b.status}
                isWaitlist={!!b.waitlistEntry}
                mentorEmail={b.mentor?.email}
                // onDelete={...} // Add if you implement delete
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;