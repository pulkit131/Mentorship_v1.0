import express from 'express';
import {
  assignMentorController,
  fillSlotFromWaitlistController, 
  viewAssignmentsController, 
  viewWaitlistController 
} from '../../controllers/mentorshipController.js';

const router = express.Router();

router.post('/assign', assignMentorController);
router.post('/fill-slot', fillSlotFromWaitlistController);
router.get('/assignments', viewAssignmentsController);
router.get('/waitlist', viewWaitlistController);

export default router;