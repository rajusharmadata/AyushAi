import express from 'express';
import { protect } from '../middleware/auth.js';
import {
    sendMessage,
    getMessages,
    createChat,
    getChats
} from '../controllers/chatController.js';

const router = express.Router();

// Chat routes
router.post('/', protect, createChat);
router.get('/', protect, getChats);
router.post('/message', protect, sendMessage);
router.get('/messages/:chatId', protect, getMessages);

export default router;
