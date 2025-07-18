import { useEffect, useState } from 'react';
import { useBookingStore } from '../store/useBookingStore';
import BookingCard from './UserBookingCard';

const MyBookings = () => {
  const { booking, getBookingByUser, isLoading } = useBookingStore();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      getBookingByUser(storedUserId);
    }
  }, []);

  if (isLoading) return <p>Loading your bookings...</p>;

  if (!booking || (Array.isArray(booking) && booking.length === 0)) {
    return <p>No bookings found.</p>;
  }

  // If booking is an array, map over it
  const bookingsArray = Array.isArray(booking) ? booking : [booking];

  return (
    <div className="flex flex-wrap justify-center mt-6 gap-4">
      {bookingsArray.map((b, idx) => (
        <BookingCard
          key={b.id || idx}
          name={b.mentor?.name}
          date={b.timeSlot}
          status={b.status}
          isWaitlist={!!b.waitlistEntry}
          mentorEmail={b.mentor?.email}
          // onDelete={...} // Add if you implement delete
        />
      ))}
    </div>
  );
};

export default MyBookings;
