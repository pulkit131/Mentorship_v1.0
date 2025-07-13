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

  getSessionsByUser: async (userId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/sessions/user/${userId}`);
      set({ sessions: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch user sessions');
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
