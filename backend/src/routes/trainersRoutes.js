import express from 'express';
import {
  getTrainers,
  getTrainerById,
  getTrainerSlots
} from '../controllers/trainersController.js';

const router = express.Router();

router.get('/', getTrainers);
router.get('/:id', getTrainerById);
router.get('/:id/slots', getTrainerSlots);

export default router;
