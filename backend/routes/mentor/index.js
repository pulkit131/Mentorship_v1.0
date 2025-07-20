import express from 'express';
import { isMentorFull } from '../../controllers/mentorController.js';

const router = express.Router();

router.get('/:mentorId/is-full', isMentorFull);

export default router;
