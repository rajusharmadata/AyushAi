import express from 'express';
import { protect } from '../middleware/auth.js';
import {
    getRemedies,
    getRemedy,
    createRemedy,
    updateRemedy,
    deleteRemedy
} from '../controllers/remedyController.js';

const router = express.Router();

// Remedy routes
router.get('/', getRemedies);
router.get('/:id', getRemedy);
router.post('/', protect, createRemedy);
router.put('/:id', protect, updateRemedy);
router.delete('/:id', protect, deleteRemedy);

export default router;
