import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useWaitlistStore = create((set, get) => ({
  isLoading: false,
  waitlistEntries: [],
  userWaitlistEntries: [],

  // Add user to waitlist
  addToWaitlist: async (userId, mentorId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/waitlist/add', {
        userId,
        mentorId
      });
      
      toast.success(res.data.message || 'Successfully added to waitlist');
      
      // Refresh user's waitlist entries
      await get().getUserWaitlistEntries(userId);
      
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to add to waitlist');
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  // Remove user from waitlist
  removeFromWaitlist: async (userId, mentorId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/waitlist/remove', {
        userId,
        mentorId
      });
      
      toast.success(res.data.message || 'Successfully removed from waitlist');
      
      // Refresh user's waitlist entries
      await get().getUserWaitlistEntries(userId);
      
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to remove from waitlist');
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  // Get user's waitlist entries
  getUserWaitlistEntries: async (userId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/waitlist/user/${userId}`);
      set({ userWaitlistEntries: res.data.waitlistEntries || [] });
      return res.data.waitlistEntries;
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to fetch waitlist entries');
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  // Get mentor's waitlist entries
  getMentorWaitlistEntries: async (mentorId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/waitlist/mentor/${mentorId}`);
      set({ waitlistEntries: res.data.waitlistEntries || [] });
      return res.data.waitlistEntries;
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to fetch mentor waitlist entries');
      return [];
    } finally {
      set({ isLoading: false });
    }
  },

  // Check if user is on waitlist for a specific mentor
  isUserOnWaitlist: (userId, mentorId) => {
    const { userWaitlistEntries } = get();
    return userWaitlistEntries.some(entry => 
      entry.userId === userId && entry.mentorId === mentorId
    );
  },

  // Reset store
  resetWaitlist: () => set({ 
    waitlistEntries: [], 
    userWaitlistEntries: [],
    isLoading: false 
  }),
})); 