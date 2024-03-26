// roomRoutes.js

import { Router } from 'express';
const router = Router();
import RoomController from '../controllers/roomController.js';

// Get all rooms
router.get('/', RoomController.getAllRooms);

// Get a single room by ID
router.get('/:id', RoomController.getRoomById);

// Create a new room
router.post('/', RoomController.createRoom);

// Updte a room by ID
router.put('/:id', RoomController.updateRoomById);

// Delete a room by ID
router.delete('/:id', RoomController.deleteRoomById);

export default router;
