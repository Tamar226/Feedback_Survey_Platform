const express = require('express');
const rolesRealtionRoute = express.Router();

const roleRelationController = require('../controllers/rolesRelationController');
const getUserRoleFromToken = require('../middleware/getUserRoleFromToken');
const isManager = require('../middleware/isManager');


rolesRealtionRoute.get('/', roleRelationController.getAllRoleRelations);
rolesRealtionRoute.get('/:username', roleRelationController.getRelationByUsername);
rolesRealtionRoute.post('/', roleRelationController.addRelation);
rolesRealtionRoute.put('/:relationUsername',  getUserRoleFromToken, isManager, roleRelationController.updateRelation);
rolesRealtionRoute.delete('/:relationUsername', roleRelationController.deleteRelation);

module.exports = rolesRealtionRoute;