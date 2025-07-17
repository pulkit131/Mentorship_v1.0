import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

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
