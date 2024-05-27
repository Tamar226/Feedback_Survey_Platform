
const express = require('express');
const managersRouter = express.Router();
const managerController = require('../controllers/managersController');

managersRouter.get('/', managerController.getAllManagers);
managersRouter.get('/:id', managerController.getManagerById);
managersRouter.post('/', managerController.addManager);
managersRouter.post('/login', managerController.loginManager);
managersRouter.post('/register', managerController.addManager);
managersRouter.put('/:managerId', managerController.updateManager);
managersRouter.delete('/:managerId', managerController.deleteManager);

module.exports = managersRouter;

