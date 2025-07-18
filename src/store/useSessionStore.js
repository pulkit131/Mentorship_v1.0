import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useSessionStore = create((set) => ({
  sessions: [],
  isLoading: false,

  getSessionsByUser: async (userId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/bookings/user/${userId}`);
      set({ sessions: Array.isArray(res.data) ? res.data : [res.data] });
    } catch (error) {
      set({ sessions: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  getSessionsByMentor: async (mentorId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/bookings/mentor/${mentorId}`);
      set({ sessions: Array.isArray(res.data) ? res.data : [res.data] });
    } catch (error) {
      set({ sessions: [] });
    } finally {
      set({ isLoading: false });
    }
  }
}));
