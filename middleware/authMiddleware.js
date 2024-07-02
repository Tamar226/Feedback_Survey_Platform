const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const allowedUrlsWithoutToken = [
    '/users/login',
    '/users/register',

]

const JWT_SECRET = process.env.JWT_SECRET || '546442'; // Ensure 'default_secret' is not used in production

const authMiddleware = (req, res, next) => {
    // Skip authentication for GET requests
    if (req.method === 'GET') {
        next(); // Continue to the next middleware/route handler
    } else {
        //TODO: and this is not login or sign up or home page
        if (allowedUrlsWithoutToken.includes(req.url)) {
            next()
        }
        else {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({ error: 'No token provided' });
            }

            try {
                const decoded = jwt.verify(token, JWT_SECRET);
                req.user = decoded;
                next();
            } catch (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }
        }
    }
};

module.exports = authMiddleware;
