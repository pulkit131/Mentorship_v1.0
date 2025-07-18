import express from 'express';
//import { createBooking, getBookingByUser } from '../../controllers/bookingController.js';
import {
  bookSession,
  getUserSessions,
  getMentorSessions,
  getUserPlanStatus,
  processWaitlist,
  getMentorWaitlistStatus
} from '../../controllers/bookingController.js';

const router = express.Router();

//router.post('/', createBooking);
//router.get('/user/:email', getBookingByUser);

// Main booking endpoint
router.post('/', bookSession);

// Get sessions
router.get('/user/:userId', getUserSessions);
router.get('/mentor/:mentorId', getMentorSessions);

// Plan status
router.get('/user/:userId/plan-status', getUserPlanStatus);

// Admin: Process waitlist for mentor
router.post('/process-waitlist/:mentorId', processWaitlist);

router.get('/mentor/:mentorId/waitlist-status', getMentorWaitlistStatus);

export default router;
