import express from 'express';
import { register, login, forgotPassword, resetPassword, logout } from '../controllers/authController.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

// Routes
router.post('/signup', register);
router.post('/login', login);
router.post('//forgotpassword', forgotPassword);
router.put('/passwordreset', resetPassword);
router.post('/logout', logout);


export default router;