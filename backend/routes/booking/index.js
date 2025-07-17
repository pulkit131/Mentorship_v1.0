import express from 'express';
import { createBooking, getBookingByUser } from '../../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/user/:email', getBookingByUser);

export default router;
