import { Schema, model } from 'mongoose';

const roomSchema = new Schema({
    roomNumber: { type: Number, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    price: { type: String, required: true },
    img: { type: String, required: false },
    availability: { type: String, required: true },
    created: {
        type: Date,
        default: Date.now
    },
});

const Room = model('Room', roomSchema);

export default Room;
