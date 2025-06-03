const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token verification failed:", error.message);
        res.status(401).json({ success: false, message: 'Token is invalid.' });
    }
};

module.exports = authMiddleware;
