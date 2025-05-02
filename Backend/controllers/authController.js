import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../module/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        // Create token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', { email }); // Debug log

        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found for email:', email); // Debug log
            return res.status(400).json({ message: 'User not found' });
        }

        console.log('User found:', {
            id: user._id,
            name: user.name,
            email: user.email
        }); // Debug log

        console.log('User found, comparing password...'); // Debug log
        console.log('Stored password hash:', user.password); // Debug log
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log('Password mismatch for user:', user._id); // Debug log
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        
        // Set reset token and expiration
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        // TODO: Implement actual email sending here
        console.log(`Reset token generated: ${resetToken}`);
        console.log(`Reset token will expire in 10 minutes`);

        res.status(200).json({
            message: 'Password reset email sent'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const { resetToken } = req.params;

        const user = await User.findOne({
            passwordResetToken: resetToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Update user's password and clear reset token
        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();

        res.status(200).json({
            message: 'Password reset successful'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// logout
export const logout = async (req, res) => {
    try {
        // Invalidate the token (this can be done by adding it to a blacklist or similar)
        res.status(200).json({
            message: 'Logout successful'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
