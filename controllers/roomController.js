import Room from '../models/room.js';

const RoomController = {
    // Get all rooms
    async getAllRooms(req, res) {
        try {
            const rooms = await Room.find();
            res.json(rooms);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Get a single room by ID
    async getRoomById(req, res) {
        try {
            const room = await Room.findById(req.params.id);
            if (!room) {
                return res.status(404).json({ message: 'Room not found' });
            }
            res.json(room);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Create a new room
    async createRoom(req, res) {
        const room = new Room({
            roomNumber: req.body.roomNumber,
            type: req.body.type,
            description: req.body.description,
            capacity: req.body.capacity,
            price: req.body.price,
            img: req.body.img,
            availability: req.body.availability,
        });

        try {
            const newRoom = await room.save();
            res.status(201).json(newRoom);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Update a room by ID
    async updateRoomById(req, res) {
        try {
            const room = await Room.findById(req.params.id);
            if (!room) {
                return res.status(404).json({ message: 'Room not found' });
            }

            room.roomNumber = req.body.roomNumber || room.roomNumber;
            room.type = req.body.type || room.type;
            room.description = req.body.description || room.description;
            room.capacity = req.body.capacity || room.capacity;
            room.price = req.body.price || room.price;
            room.img = req.body.img || room.img;
            room.availability = req.body.availability || room.availability;

            const updatedRoom = await room.save();
            res.json(updatedRoom);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Delete a room by ID
    async deleteRoomById(req, res) {
        try {
            const room = await Room.findById(req.params.id);
            if (!room) {
                return res.status(404).json({ message: 'Room not found' });
            }
            await Room.deleteOne({ _id: room._id });
            res.json({ message: 'Room deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default RoomController;


