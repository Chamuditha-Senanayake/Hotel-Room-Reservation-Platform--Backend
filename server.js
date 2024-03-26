import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import authMiddleware from './middleware/authMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use(express.json());

dotenv.config();

const option = {
    socketTimeoutMS: 30000,
};

//db connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, option).then(function () {
    console.log("MongoDB connected!")
}, function (err) {
    console.log("Failed to connect with MongoDB", mongoURI)
});

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(authMiddleware);


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
