const rolesServices = require('../services/rolesService.js');

const getAllRoles = async (req, res, next) => {
    try {
        const roles = await rolesServices.getAllRoles();
        res.status(200).send([roles[0]]);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const getRoleByName = async (req, res, next) => {
    const name = req.params.name;
    try {
        const role = await rolesServices.getRoleByName(name);
        res.status(200).send(role);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const addRole = async (req, res, next) => {
    const newRole = req.body;
    try {
        const addedRole = await rolesServices.addRole(newRole);
        res.status(200).send(addedRole);
    } catch (error) {
        console.error('Error adding role in controllers:', error);
        res.status(500).send('Internal Server Error');
    }
};

const addAllRoles = async (req, res, next) => {
    try{
        const managerRole = {
            name: 'manager'
        }
        const reviewerRole = {
            name:'reviewer'
        }
        const userRole = {
            name: 'user'
        }
        const addedManagerRole = await rolesServices.addRole(managerRole);
        const addedReviewerRole = await rolesServices.addRole(reviewerRole);
        const addedUserRole = await rolesServices.addRole(userRole);

        res.status(200).json({addedManagerRole, addedReviewerRole, addedUserRole});
    } catch (error) {
        console.error('Error adding roles in controllers:', error);
        res.status(500).send('Internal Server Error');
    }
};

const updateRole = async (req, res, next) => {
    const roleName = req.params.roleName;
    const updatedRoleData = req.body;
    try {
        const updateMessage = await rolesServices.updateRole(roleName, updatedRoleData);
        res.status(200).send(updateMessage);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const deleteRole = (req, res, next) => {
    const roleName = req.params.roleName;
    try {
        const deleteMessage = rolesServices.deleteRole(roleName);
        res.status(200).send(deleteMessage);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

module.exports = {
    getAllRoles,
    getRoleByName,
    addRole,
    updateRole,
    deleteRole,
    addAllRoles
};