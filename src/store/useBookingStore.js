import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useBookingStore = create((set) => ({
  isLoading: false,
  booking: null,

  createBooking: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/bookings', data);
      toast.success(res.data.message || 'Booking created successfully');
      set({ booking: res.data.booking });
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to create booking');
    } finally {
      set({ isLoading: false });
    }
  },

  getBookingByUser: async (email) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/bookings/user/${email}`);
      set({ booking: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to fetch booking');
    } finally {
      set({ isLoading: false });
    }
  },
}));
