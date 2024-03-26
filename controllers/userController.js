import { hash, compare } from 'bcrypt';
import pkg from 'jsonwebtoken';
import User from '../models/user.js';

const { sign } = pkg;

const UserController = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get a single user by ID
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Create a new user
    async createUser(req, res) {
        const { name, email, password, phone } = req.body;
        const isAdmin = false; // Assuming newly created users are not admins by default

        const hashedPassword = await hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            isAdmin,
        });

        try {
            const newUser = await user.save();
            res.status(201).json(newUser);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Update a user by ID
    async updateUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const hashedPassword = await hash(req.body.password, 10);

            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.password = hashedPassword || user.password;
            user.phone = req.body.phone || user.phone;
            user.isAdmin = req.body.isAdmin || user.isAdmin;

            const updatedUser = await user.save();
            res.json(updatedUser);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Delete a user by ID
    async deleteUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            await User.deleteOne({ _id: user._id });
            res.json({ message: 'User deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default UserController;
