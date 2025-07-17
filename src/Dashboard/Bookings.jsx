import { useEffect, useState } from 'react';
import { useBookingStore } from '../store/useBookingStore';
import BookingCard from './UserBookingCard';

const MyBookings = () => {
  const { booking, getBookingByUser, isLoading } = useBookingStore();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      getBookingByUser(storedEmail);
    }
  }, []);

  if (isLoading) return <p>Loading your booking...</p>;

  if (!booking || Object.keys(booking).length === 0) {
    return <p>No booking found.</p>;
  }

  return (
    <div className="flex justify-center mt-6">
      <BookingCard name={booking.mentor} date={booking.date} />
    </div>
  );
};

export default MyBookings;
