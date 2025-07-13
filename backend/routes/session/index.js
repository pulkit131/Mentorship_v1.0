import express from 'express';
import { createSession, getSessionsByUser, getSessionsByMentor } from '../../controllers/sessionController.js';

const router = express.Router();

router.post('/', createSession);
router.get('/user/:userId', getSessionsByUser);
router.get('/mentor/:mentorId', getSessionsByMentor);

export default router;