const roleRelationRepository = require('../repositories/roleRelationHandlerDB');
const dotenv = require('dotenv');
dotenv.config();

const getAllRoleRelations = async ()=>{
    const result = await roleRelationRepository.getAllRoleRelations();
    if(result.hasError){
        throw new Error('Error fetching relations');
    }
    return result.data;
}

const getRelationByUsername = async (relationUsername) => {
    const result = await roleRelationRepository.getRelationByUsername(relationUsername);
    if (result.hasError) {
        throw new Error('Error fetching relations');
    }
    return result.data;
};

const addRelation = async (newRelation) => {
    const result = await roleRelationRepository.addRelation(newRelation);
    if (result.insertId >= 0) {
        const insertRelation = await roleRelationRepository.getRelationByUsername(result.insertId);
        return insertRelation.data;
    } else {
        throw new Error('Error adding relation');
    }
};

const updateRelation = async (relationUsername, updateRelationData) => {
    const result = await roleRelationRepository.updateRelation(relationUsername, updateRelationData);
    if (result.affectedRows >= 0) {
        return result.data;
    } else {
        throw new Error('Error updating relation');
    }
};

const deleteRelation = async (relationUsername) => {
    const result = await roleRelationRepository.deleteRelation(relationUsername);
    if (result.affectedRows > 0) {
        return 'Relation deleted successfully';
    } else {
        throw new Error('Error deleting relation');
    }
};

module.exports = {
    getAllRoleRelations,
    getRelationByUsername,
    addRelation,
    updateRelation,
    deleteRelation
}