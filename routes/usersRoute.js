
const express = require('express');
const usersRouter = express.Router();
const userController = require('../controllers/usersController');

usersRouter.get('/', userController.getAllUsers);
usersRouter.get('/:id', userController.getUserById);
usersRouter.post('/', userController.addUser);
usersRouter.post('/login', userController.loginUser);
usersRouter.post('/register', userController.addUser);
usersRouter.put('/:userId', userController.updateUser);
usersRouter.delete('/:userId', userController.deleteUser);

module.exports = usersRouter;

