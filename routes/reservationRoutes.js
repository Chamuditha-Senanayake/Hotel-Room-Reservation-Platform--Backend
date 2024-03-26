import { Router } from 'express';
const router = Router();
import ReservationController from '../controllers/reservationController.js';

// Get all reservations
router.get('/', ReservationController.getAllReservations);

// Get reservations by UserID
router.get('/user/:userId', ReservationController.getUserReservations);

// Get a single reservation by ID
router.get('/:id', ReservationController.getReservationById);

// Create a new reservation
router.post('/', ReservationController.createReservation);

// Updte a reservation by ID
router.put('/:id', ReservationController.updateReservation);

// Delete a reservation by ID
router.delete('/:id', ReservationController.deleteReservation);

export default router;
