import Chat from '../module/chat.js';
import Message from '../module/message.js';
import User from '../module/User.js';

export const createChat = async (req, res) => {
    try {
        const { participants } = req.body;
        
        // Check if chat already exists
        const existingChat = await Chat.findOne({
            participants: { $all: participants }
        });

        if (existingChat) {
            return res.status(400).json({ message: 'Chat already exists' });
        }

        const chat = new Chat({ participants });
        await chat.save();

        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getChats = async (req, res) => {
    try {
        const userChats = await Chat.find({
            participants: { $in: [req.user._id] }
        }).populate('participants', 'name profilePicture');

        res.json(userChats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { chatId, content } = req.body;
        
        const message = new Message({
            sender: req.user._id,
            receiver: req.user._id, // We'll need to get the receiver ID from the chat
            content,
            chat: chatId
        });

        await message.save();

        // Update chat's last message time
        await Chat.findByIdAndUpdate(chatId, {
            lastMessage: Date.now()
        });

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            chat: req.params.chatId
        })
        .populate('sender', 'name profilePicture')
        .sort({ timestamp: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
