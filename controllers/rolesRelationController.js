const rolesRelationService = require('../services/roleRelationService');

const getAllRoleRelations = async (req, res, next)=>{
    try {
        const relations = await rolesRelationService.getAllRoleRelations();
        res.status(200).send(relations);
    } 
    catch {
        res.status(500).send(error.message);
    }
}

const getRelationByUsername = async (req, res, next) => {
    const relationUsername = req.params.relationUsername;
    try {
        const relation = await rolesRelationService.getRelationByUsername(relationUsername);
        res.status(200).send(relation);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const addRelation = async (req, res, next) => {
    const newRelation = req.body;
    try {
        const addedRelation = await rolesRelationService.addRelation(newRelation);
        res.status(200).send(addedRelation);
    } catch (error) {
        console.error('Error adding relation in controllers:', error);
        res.status(500).send('Internal Server Error');
    }
}

const updateRelation = async (req, res, next) => {
    const relationUsername = req.params.relationUsername;
    const updateRelationData = req.body;
    try {
        const updateRelation = await rolesRelationService.updateRelation(relationUsername, updateRelationData);
        res.status(200).send(updateRelation);
    } catch (err) {
        res.status(404).send(err.message);
    }
};

const deleteRelation = async (req, res, next) => {
    const relationUsername = req.params.relationUsername;
    try {
        const deleteMessage = await rolesRelationService.deleteRelation(relationUsername);
        res.status(200).send(deleteMessage);
    } catch (err) {
        res.status(404).send(err.message);
    }
};

module.exports = {
    getAllRoleRelations,
    getRelationByUsername,
    addRelation,
    updateRelation,
    deleteRelation
};