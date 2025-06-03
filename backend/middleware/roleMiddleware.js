const roleMiddleware = (requiredRole) => (req, res, next) => {
    if (req.user.type !== requiredRole) {
        return res.status(403).json({ success: false, message: 'Access denied. Insufficient permissions.' });
    }
    next();
};

module.exports = roleMiddleware;
