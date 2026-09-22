import express from 'express';
import {
  getFacilities,
  submitInquiry
} from '../controllers/facilitiesController.js';

const router = express.Router();

router.get('/', getFacilities);
router.post('/inquiry', submitInquiry);

export default router;
