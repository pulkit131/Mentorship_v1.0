import express from 'express';
import { createUser, getUsers, deleteUser } from '../../controllers/userController.js';
import { subscribeUserToPlan } from '../../controllers/userController.js';
import { hasPlanController } from '../../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.delete('/:id', deleteUser);
router.post('/subscribe', subscribeUserToPlan);
router.get('/:email/has-plan', hasPlanController);

export default router;
