import express from 'express';
import {
  createOrderController,
  verifyPaymentController,
} from '../../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', createOrderController);
router.post('/verify-payment', verifyPaymentController);

export default router;
