const express = require('express');
const usersRoute = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/authMiddleware');

usersRoute.get('/', usersController.getAllUsers);
usersRoute.get('/:id', authMiddleware, usersController.getUserById);
usersRoute.post('/register', usersController.addUser);
usersRoute.post('/login', usersController.loginUser);
usersRoute.put('/:userId', authMiddleware, usersController.updateUser);
usersRoute.delete('/:userId', authMiddleware, usersController.deleteUser);

module.exports = usersRoute;
