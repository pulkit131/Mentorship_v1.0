import express from 'express';
import {
  addToWaitlist,
  removeFromWaitlist,
  getUserWaitlistEntries,
  getMentorWaitlistEntries
} from '../../controllers/waitlistController.js';

const router = express.Router();

// Add user to waitlist
router.post('/add', addToWaitlist);

// Remove user from waitlist
router.post('/remove', removeFromWaitlist);

// Get user's waitlist entries
router.get('/user/:userId', getUserWaitlistEntries);

// Get mentor's waitlist entries
router.get('/mentor/:mentorId', getMentorWaitlistEntries);

export default router; 