const express = require('express');
const rolesRoute = express.Router();

const rolesController = require('../controllers/rolesController');

rolesRoute.get('/', rolesController.getAllRoles);
rolesRoute.get('/:name', rolesController.getRoleByName);
rolesRoute.post('/', rolesController.addRole);
rolesRoute.post('/addAllRoles', rolesController.addAllRoles);
rolesRoute.put('/:id', rolesController.updateRole);
rolesRoute.delete('/:id', rolesController.deleteRole);

module.exports = rolesRoute;
