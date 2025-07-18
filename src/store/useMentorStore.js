import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

export const useMentorStore = create((set) => ({
  mentors: [],
  isLoading: false,
  fetchMentors: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/users?role=MENTOR');
      set({ mentors: res.data });
    } catch (error) {
      set({ mentors: [] });
    } finally {
      set({ isLoading: false });
    }
  },
}));
