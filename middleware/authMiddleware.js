import pkg from 'jsonwebtoken';
import User from '../models/user.js';

const { verify } = pkg;

const AuthMiddleware = async (req, res, next) => {
    try {
        // Exclude login register and rooms routes from authentication
        if (req.path === '/api/auth/login' || req.path === '/api/auth/register' || req.path === '/api/rooms') {
            return next();
        }

        const token = req.headers.authorization.split(' ')[1];
        const decoded = verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error('User not found');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

export default AuthMiddleware;
