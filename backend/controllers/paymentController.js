import { createOrder, verifyPayment } from '../services/paymentService.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createOrderController = async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;
    const order = await createOrder({ amount, currency, receipt });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID, // ✅ Only expose the public key
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order', details: err.message });
  }
};

export const verifyPaymentController = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    email,
    planType,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !email || !planType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const isValid = verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature });

  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: 'Invalid signature, payment verification failed',
    });
  }

  try {
    const plan = await prisma.plan.findFirst({ where: { name: planType } });

    if (!plan) {
      return res.status(400).json({ error: 'Invalid planType. Plan not found in database.' });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        planType: plan.name,
        planPrice: Math.floor(plan.price),
        freeSessions: 0,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Payment verified and plan updated successfully.',
      user: updatedUser,
    });
  } catch (err) {
    console.error('Error updating user after payment:', err);
    return res.status(500).json({
      success: false,
      message: 'Payment verified but user update failed.',
      error: err.message,
    });
  }
};
