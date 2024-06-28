const express = require('express');
const rolesRealtionRoute = express.Router();

const roleRelationController = require('../controllers/rolesRelationController');

rolesRealtionRoute.get('/', roleRelationController.getAllRoleRelations);
rolesRealtionRoute.get('/:username', roleRelationController.getRelationByUsername);
rolesRealtionRoute.post('/', roleRelationController.addRelation);
rolesRealtionRoute.put('/:relationUsername', roleRelationController.updateRelation);
rolesRealtionRoute.delete('/:relationUsername', roleRelationController.deleteRelation);

module.exports = rolesRealtionRoute;