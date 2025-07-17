import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useUserStore = create((set) => ({
  users: [],
  isLoading: false,

  createUser: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/users', data);
      toast.success('User created successfully');
      set((state) => ({
        users: [...state.users, res.data],
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create user');
    } finally {
      set({ isLoading: false });
    }
  },

  getAllUsers: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get('/users');
      set({ users: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch users');
    } finally {
      set({ isLoading: false });
    }
  },

  deleteUser: async (userId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/users/${userId}`);
      toast.success('User deleted successfully');
      set((state) => ({
        users: state.users.filter((user) => user._id !== userId),
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete user');
    } finally {
      set({ isLoading: false });
    }
  },

  subscribeToPlan: async ({ email, planId }) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/users/subscribe', { email, planId });
      toast.success('Subscribed to plan successfully');
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to subscribe to plan');
    } finally {
      set({ isLoading: false });
    }
  },

  checkUserHasPlan: async (email) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/users/hasPlan/${email}`);
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to check plan');
    } finally {
      set({ isLoading: false });
    }
  },

  checkSessionBookingAllowedByEmail: async (email) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/users/checkBookingAllowed/${email}`);
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to check booking eligibility');
    } finally {
      set({ isLoading: false });
    }
  },
}));
