import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

// Get all users
router.get('/', UserController.getAllUsers);

// Get a single user by ID
router.get('/:id', UserController.getUserById);

// Create a new user
router.post('/', UserController.createUser);

// Updte a user by ID
router.put('/:id', UserController.updateUserById);

// Delete a user by ID
router.delete('/:id', UserController.deleteUserById);

export default router;
