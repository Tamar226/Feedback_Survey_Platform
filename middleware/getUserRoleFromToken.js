const jwt = require('jsonwebtoken');
const JWT_SECRET = '546442';

const extractUserRoleFromToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userRole = decoded.role;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = extractUserRoleFromToken;
