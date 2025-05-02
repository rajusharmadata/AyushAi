import express from 'express';
import { register, login, forgotPassword, resetPassword } from '../controllers/authController.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

// Routes
router.post('/api/auth/signup', register);
router.post('/api/auth/login', login);
router.post('/api/auth/forgotpassword', forgotPassword);
router.put('/api/auth/passwordreset/:resetToken', resetPassword);

export default router;