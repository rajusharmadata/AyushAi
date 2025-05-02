import Chat from '../module/chat.js';
import Message from '../module/message.js';
import User from '../module/User.js';
import Remedy from '../module/Remedy.js'; // Ensure the correct path to the Remedy model


export const getRemedyForMessage = async (req, res) => {
    try {
        const { message } = req.body;

        // Split the user's message into words
        const words = message.split(/\s+/);

        // Find remedies where any word matches
        const remedies = await Remedy.find({
            $or: [
            { symptoms: { $in: words } },
            { remedy: { $in: words } }
            ]
        });

        if (remedies.length > 0) {
            const filteredRemedies = remedies.map(remedy => ({
                remedy: remedy.remedy,
                symptoms: remedy.symptoms.filter(symptom => words.includes(symptom)),
                description: remedy.description
            }));
            res.json(filteredRemedies);
            console.log('Filtered Remedies:', filteredRemedies);
        } else {
            res.status(404).json({ message: 'No remedies found for the given message.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


