import express from 'express';
import {
  createOrderController,
  verifyPaymentController,
} from '../../controllers/paymentController.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const router = express.Router();

router.post('/create-order', createOrderController);
router.post('/verify-payment', verifyPaymentController);
router.get('/has-plan', async (req, res) => {
  const { email, planType } = req.query;
  if (!email || !planType) {
    return res.status(400).json({ hasPlan: false, error: 'Missing email or planType' });
  }
  const existingPayment = await prisma.payment.findFirst({
    where: {
      userEmail: email,
      planName: planType,
      status: { in: ['completed', 'success', 'paid'] }
    }
  });
  res.json({ hasPlan: !!existingPayment });
});

export default router;
