import express from 'express';
import { createPlan, getAllPlans } from '../../controllers/planController.js';

const router = express.Router();

router.post('/', createPlan);
router.get('/', getAllPlans);

export default router;