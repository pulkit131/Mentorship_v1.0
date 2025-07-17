import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useSessionStore = create((set) => ({
  sessions: [],
  isLoading: false,

  createSession: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/sessions', data);
      toast.success('Session created successfully');
      set((state) => ({
        sessions: [...state.sessions, res.data],
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create session');
    } finally {
      set({ isLoading: false });
    }
  },

  getSessionsByUser: async (email) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/bookings/user/${email}`);
      const bookings = res.data ? [res.data] : []; // assuming one booking per user, or change to res.data if it's an array
      set({ sessions: bookings });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      set({ sessions: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  getSessionsByMentor: async (mentorId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/sessions/mentor/${mentorId}`);
      set({ sessions: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch mentor sessions');
    } finally {
      set({ isLoading: false });
    }
  }
}));
