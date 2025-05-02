import express from 'express';
import authRoutes from './auth.js';
import chatRoutes from './chat.js';
import remedyRoutes from './remedy.js';
import practitionerRoutes from './practitioner.js';
import userRoutes from './user.js';

const router = express.Router();

// Authentication routes
router.use('/auth', authRoutes);

// Chat routes
router.use('/chat', chatRoutes);

// Remedy routes
router.use('/remedies', remedyRoutes);

// Practitioner routes
router.use('/practitioners', practitionerRoutes);

// User routes
router.use('/user', userRoutes);

export default router;
