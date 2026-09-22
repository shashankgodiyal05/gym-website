import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  resetData
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', getProfile);
router.put('/profile', updateProfile);
router.post('/reset', resetData);

export default router;
