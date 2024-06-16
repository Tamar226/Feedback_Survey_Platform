const express = require('express');
const usersRoute = express.Router();

const usersController = require('../controllers/usersController');

usersRoute.get('/', usersController.getAllUsers);
usersRoute.get('/:id', usersController.getUserById);
// usersRoute.post('/', usersController.addUser); //FIXME: ?צריך שיהיה את ההוספה של משתמש בלי רג'יסטר
usersRoute.post('/login', usersController.loginUser);
usersRoute.post('/register', usersController.addUser);
usersRoute.put('/:userId', usersController.updateUser);
usersRoute.delete('/:userId', usersController.deleteUser);

module.exports = usersRoute;
