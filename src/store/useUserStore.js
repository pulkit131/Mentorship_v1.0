import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useUserStore = create((set) => ({
  user: null, // Currently logged-in user
  users: [],
  isLoading: false,

  // Set the logged-in user and store only the email in localStorage
  setUser: (user) => {
    if (user?.email) {
      localStorage.setItem('user', JSON.stringify({ email: user.email }));
    } else {
      localStorage.removeItem('user');
    }
    set({ user });
  },

  // Load user from localStorage on app start
  loadUserFromLocalStorage: () => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.email) {
        set({ user: { email: parsed.email } });
      }
    }
  },

  // Clear user and localStorage
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },

  // Create a new user
  createUser: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/users', data);
      toast.success('User created successfully');
      set((state) => ({
        users: [...state.users, res.data],
      }));
      return res.data; // <-- THIS IS IMPORTANT
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create user');
      return null; // <-- Return null on error
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch all users
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

  // Delete a user by ID
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

  // Subscribe a user to a plan
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

  // Check if a user has an active plan
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

  // Check if user is allowed to book a session
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
