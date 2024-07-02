const isManager = (req, res, next) => {
    if (req.userRole !== 'reviewer') {
        return res.status(403).json({ error: 'Access denied. Reviewer only.' });
    }
    next();
};

module.exports = isManager;
