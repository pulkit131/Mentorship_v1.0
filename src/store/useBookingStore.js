import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useBookingStore = create((set) => ({
  isLoading: false,
  booking: null,
  planStatus: null,

  createBooking: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/bookings', data);
      if (res.data.waitlistEntry) {
        toast.success("Mentor is full. You have been added to the waitlist.");
      } else {
        toast.success(res.data.message || 'Booking created successfully');
      }
      set({ booking: res.data.session || res.data.waitlistEntry });
    } catch (error) {
      const errorData = error?.response?.data;
      
      if (errorData?.requiresPayment) {
        toast.error("Payment required. Please subscribe to a plan first.");
        // The scroll behavior will be handled by the component that calls this function
        throw error; // Re-throw to let the component handle scrolling
      } else {
        toast.error(errorData?.error || 'Failed to create booking');
      }
    } finally {
      set({ isLoading: false });
    }
  },

  getBookingByUser: async (userId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/bookings/user/${userId}`);
      set({ booking: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to fetch booking');
    } finally {
      set({ isLoading: false });
    }
  },

  getBookingByMentor: async (mentorId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/bookings/mentor/${mentorId}`);
      set({ booking: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to fetch mentor bookings');
    } finally {
      set({ isLoading: false });
    }
  },

  getUserPlanStatus: async (userId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/bookings/user/${userId}/plan-status`);
      set({ planStatus: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to fetch plan status');
    } finally {
      set({ isLoading: false });
    }
  },

  processWaitlist: async (mentorId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post(`/bookings/process-waitlist/${mentorId}`);
      toast.success(res.data.message || 'Processed waitlist');
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to process waitlist');
    } finally {
      set({ isLoading: false });
    }
  },

  resetBooking: () => set({ booking: null, planStatus: null }),
}));
