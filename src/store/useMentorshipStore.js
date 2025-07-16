import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useMentorshipStore = create((set) => ({
  assignments: [],
  waitlist: [],
  isLoading: false,

  fetchAssignments: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/assignments');
      set({ assignments: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to load assignments');
    } finally {
      set({ isLoading: false });
    }
  },

  fetchWaitlist: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/waitlist');
      set({ waitlist: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to load waitlist');
    } finally {
      set({ isLoading: false });
    }
  },

  assignMentor: async (data) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post('/assign', data);
      toast.success('Mentor assigned!');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Assignment failed');
    } finally {
      set({ isLoading: false });
    }
  },

  fillSlotFromWaitlist: async (data) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post('/fill-slot', data);
      toast.success('Slot filled from waitlist!');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Filling slot failed');
    } finally {
      set({ isLoading: false });
    }
  },
}));
