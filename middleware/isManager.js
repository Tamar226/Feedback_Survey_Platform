const isManager = (req, res, next) => {
    if (req.userRole !== 'manager') {
        return res.status(403).json({ error: 'Access denied. Managers only.' });
    }
    next();
};

module.exports = isManager;
