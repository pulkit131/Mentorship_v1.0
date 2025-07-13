import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const usePlanStore = create((set) => ({
  plans: [],
  isLoading: false,

  fetchPlans: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/plans');
      set({ plans: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch plans');
    } finally {
      set({ isLoading: false });
    }
  },

  createPlan: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/plans', data);
      toast.success('Plan created successfully');
      set((state) => ({ plans: [...state.plans, res.data] })); // append new plan
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create plan');
    } finally {
      set({ isLoading: false });
    }
  }
}));
