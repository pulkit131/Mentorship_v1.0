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
      const res = await axiosInstance.post('/payments/verify-payment', paymentData);

      if (res.data.success) {
        toast.success('Payment verified and plan updated!');
        // Handle waitlist processing results
        if (res.data.waitlistProcessed && res.data.waitlistResults) {
          const assignedMentors = res.data.waitlistResults.filter(result => result.action === 'assigned');
          const stillWaiting = res.data.waitlistResults.filter(result => result.action === 'still_on_waitlist');
          
          if (assignedMentors.length > 0) {
            toast.success(`You've been assigned to ${assignedMentors.length} mentor(s)!`);
          }
          
          if (stillWaiting.length > 0) {
            toast.info(`Still on waitlist for ${stillWaiting.length} mentor(s)`);
          }
        }
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
