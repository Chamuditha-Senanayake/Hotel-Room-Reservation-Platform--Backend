import { Schema, model } from 'mongoose';

const reservationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    specialRequirements: {
        type: [String],
        default: []
    },
    additionalRequests: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
});

const Reservation = model('Reservation', reservationSchema);

export default Reservation;
