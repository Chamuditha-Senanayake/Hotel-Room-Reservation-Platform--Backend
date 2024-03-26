import { hash, compare } from 'bcrypt';
import pkg from 'jsonwebtoken';
import User from '../models/user.js';

const { sign } = pkg;

const AuthController = {

    async register(req, res) {
        try {
            const { name, email, password, phone } = req.body;
            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            // Hash the password
            const hashedPassword = await hash(password, 10);
            // Create new user
            const newUser = new User({
                name,
                email,
                phone,
                isAdmin: "false",
                password: hashedPassword,
            });

            const user = await newUser.save();

            // Generate JWT token
            const token = sign({ userId: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, }, process.env.JWT_SECRET);

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
                token: token,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            // Validate password
            const validPassword = await compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            // Generate JWT token
            const token = sign({ userId: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, }, process.env.JWT_SECRET);
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
                token: token,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default AuthController;

