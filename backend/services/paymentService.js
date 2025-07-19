import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createOrder = async ({ amount, currency = 'INR', receipt }) => {
  const options = {
    amount: amount * 100, // in paise
    currency,
    receipt: receipt || `rcptid_${Date.now()}`,
  };
  return await razorpay.orders.create(options);
};

export const verifyPayment = ({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) => {
  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  return generated_signature === razorpay_signature;
};

export const savePaymentRecord = async ({ userEmail, planName, status = 'completed' }) => {
  try {
    // Calculate subscription end date (e.g., 30 days from now)
    const subscriptionStarts = new Date();
    const subscriptionEnds = new Date();
    subscriptionEnds.setDate(subscriptionEnds.getDate() + 30); // 30 days subscription

    const payment = await prisma.payment.create({
      data: {
        status,
        userEmail,
        planName,
        subscriptionStarts,
        subscriptionEnds
      }
    });

    return payment;
  } catch (error) {
    console.error('Error saving payment record:', error);
    throw error;
  }
};
