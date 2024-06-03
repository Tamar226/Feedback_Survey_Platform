const express = require('express');
const managersRouter = express.Router();

const managersController = require('../controllers/managersController');

managersRouter.get('/', managersController.getAllManagers);
managersRouter.get('/:id', managersController.getManagerById);
managersRouter.post('/', managersController.addManager);
managersRouter.post('/login', managersController.loginManager);
managersRouter.post('/register', managersController.addManager);
managersRouter.put('/:managerId', managersController.updateManager);
managersRouter.delete('/:managerId', managersController.deleteManager);

module.exports = managersRouter;