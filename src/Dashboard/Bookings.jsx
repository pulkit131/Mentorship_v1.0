import { useEffect } from 'react';
import { useBookingStore } from '../store/useBookingStore';
import BookingCard from './BookingCard';

const MyBookings = () => {
  const email = localStorage.getItem('userEmail');

  const { booking, getBookingByUser, isLoading } = useBookingStore();

  useEffect(() => {
    if (email) {
      getBookingByUser(email);
    }
  }, [email]);

  if (isLoading) return <p>Loading your booking...</p>;

  if (!booking) return <p>No booking found.</p>;

  return (
    <div className="flex justify-center mt-6">
      <BookingCard name={booking.mentor} />
    </div>
  );
};

export default MyBookings;
