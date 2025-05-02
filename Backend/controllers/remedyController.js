import Remedy from '../module/Remedy.js';
import User from '../module/User.js';

export const getRemedies = async (req, res) => {
    try {
        const remedies = await Remedy.find()
            .populate('author', 'name profilePicture')
            .sort({ createdAt: -1 });
        res.json(remedies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRemedy = async (req, res) => {
    try {
        const remedy = await Remedy.findById(req.params.id)
            .populate('author', 'name profilePicture');
        
        if (!remedy) {
            return res.status(404).json({ message: 'Remedy not found' });
        }

        res.json(remedy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createRemedy = async (req, res) => {
    try {
        const { title, description, category, image } = req.body;
        
        const remedy = new Remedy({
            title,
            description,
            category,
            image,
            author: req.user._id
        });

        await remedy.save();
        res.status(201).json(remedy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRemedy = async (req, res) => {
    try {
        const remedy = await Remedy.findById(req.params.id);
        
        if (!remedy) {
            return res.status(404).json({ message: 'Remedy not found' });
        }

        if (remedy.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { title, description, category, image } = req.body;
        
        Object.assign(remedy, {
            title,
            description,
            category,
            image
        });

        await remedy.save();
        res.json(remedy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRemedy = async (req, res) => {
    try {
        const remedy = await Remedy.findById(req.params.id);
        
        if (!remedy) {
            return res.status(404).json({ message: 'Remedy not found' });
        }

        if (remedy.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await remedy.deleteOne();
        res.json({ message: 'Remedy deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
