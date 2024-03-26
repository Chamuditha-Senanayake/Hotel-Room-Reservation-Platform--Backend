import Reservation from '../models/reservation.js';

const ReservationController = {
    async getAllReservations(req, res) {
        try {
            const reservations = await Reservation.find().populate('room').populate('user');;
            res.status(200).json({
                error: false,
                message: 'Success!',
                data: reservations,
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                message: 'Failed!',
                data: null,
            });
        }
    },

    // Get reservations for a specific user
    async getUserReservations(req, res) {
        try {
            const userId = req.params.userId;
            const reservations = await Reservation.find({ user: userId }).populate('room');
            res.status(200).json({
                error: false,
                message: 'Success!',
                data: reservations,
            });
        } catch (error) {
            res.status(500).json({
                error: true,
                message: 'Failed!',
                data: null,
            });
        }
    },


    // Get reservation by ID
    async getReservationById(req, res) {
        try {
            const reservationId = req.params.id;
            const reservation = await Reservation.findById(reservationId);
            if (!reservation) {
                return res.status(404).json({ message: 'Reservation not found' });
            }
            res.status(200).json(reservation);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create a new reservation
    async createReservation(req, res) {
        try {
            const { userId, roomId, checkInDate, checkOutDate, specialRequirements, additionalRequests } = req.body;
            // Create new reservation
            const reservation = new Reservation({
                user: userId,
                room: roomId,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                specialRequirements: specialRequirements,
                additionalRequests: additionalRequests

            });
            await reservation.save();
            res.status(201).json(reservation);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update an existing reservation
    async updateReservation(req, res) {
        try {
            const reservationId = req.params.id;
            const updates = req.body;
            const options = { new: true }; // Return the updated document
            const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, updates, options);
            if (!updatedReservation) {
                return res.status(404).json({ message: 'Reservation not found' });
            }
            res.status(200).json(updatedReservation);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete a reservation
    async deleteReservation(req, res) {
        try {
            const reservationId = req.params.id;
            const deletedReservation = await Reservation.findByIdAndDelete(reservationId);
            if (!deletedReservation) {
                return res.status(404).json({ message: 'Reservation not found' });
            }
            res.status(200).json({ message: 'Reservation deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default ReservationController;
