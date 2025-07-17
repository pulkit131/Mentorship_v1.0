import express from 'express';
import {
  createOrderController,
  verifyPaymentController,
  getPaymentHistoryController,
} from '../../controllers/paymentController.js';

const router = express.Router();

router.post('/create-order', createOrderController);
router.post('/verify-payment', verifyPaymentController);
router.get('/history', getPaymentHistoryController);

export default router;
