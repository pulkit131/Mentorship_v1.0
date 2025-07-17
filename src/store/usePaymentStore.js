import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const usePaymentStore = create((set) => ({
  isLoading: false,

  createOrder: async ({ amount, currency = 'INR' }) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/payments/create-order', {
        amount,
        currency,
      });

      return res.data; // { orderId, amount, currency, key }
    } catch (error) {
      toast.error(error?.response?.data?.error || 'Failed to create order');
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  verifyPayment: async (paymentData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/payments/verify', paymentData);

      if (res.data.success) {
        toast.success('Payment verified and plan updated!');
      } else {
        toast.error('Payment verification failed');
      }

      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Verification failed');
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
}));
