import express from 'express';
import {
  getPlans,
  enroll,
  getActiveMembership
} from '../controllers/membershipsController.js';

const router = express.Router();

router.get('/', getPlans);
router.post('/enroll', enroll);
router.get('/active', getActiveMembership);

export default router;
