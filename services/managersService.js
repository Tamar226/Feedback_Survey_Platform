const managersRepository = require('../repositories/managersHandlerDB');
const roleRelationService = require('./roleRelationService');
const rolesService = require('./rolesService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = /*process.env.JWT_SECRET*/'546442' || 'your_jwt_secret'; // יש לשמור בסוד את ה-secret

const getAllManagers = async () => {
    const result = await managersRepository.getAllManagers();
    if (result.hasError) {
        throw new Error('Error fetching managers');
    }
    return result.data;
};

const getManagerById = async (id) => {
    const result = await managersRepository.getManagerById(id);
    if (result.hasError) {
        throw new Error(`Manager with ID ${id} not found`);
    }
    return result.data;
};

const addManager = async (newManager) => {
    try {
        // Get the role ID for 'MANAGER'
        const managerRole = await rolesService.getRoleByName('MANAGER');

        // Add new relation to roleRelation table
        const newRelation = {
            username: newManager.username,
            roleName: managerRole[0].name // Assuming 'managerRole.id' is the ID for the manager role
        };
        await roleRelationService.addRelation(newRelation);

        // Now add the manager to the managers table
        const result = await managersRepository.addManager(newManager);
        if (result.insertId > 0) {
            const insertManager = await managersRepository.getManagerById(result.insertId);
            return insertManager.data;
        } else {
            throw new Error('Error adding manager');
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
};


async function getManagerDetails(userName, password) {
    try {
        const rows = await managersRepository.findManagerByUsername(userName);
        if (rows.length === 0) {
            throw new Error('Manager not found');
        }
        const manager = rows[0][0];
        const isMatch = await bcrypt.compare(password, manager.password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ id: manager.id, username: manager.username }, JWT_SECRET);

        return {
            hasError: false,
            manager: {
                id: manager.id,
                username: manager.username,
                email: manager.email
            },
            token
        };
    } catch (error) {
        console.error("error in services", error);
        throw error;
    }
}


const updateManager = async (managerId, updatedManagerData) => {
    const result = await managersRepository.updateManager(managerId, updatedManagerData);
    if (result.affectedRows > 0) {
        return `Manager with ID ${managerId} updated successfully`;
    } else {
        throw new Error(`Manager with ID ${managerId} not found`);
    }
};

const deleteManager = async (managerId) => {
    const result = await managersRepository.deleteManager(managerId);
    if (result.affectedRows > 0) {
        return `Manager with ID ${managerId} deleted successfully`;
    } else {
        throw new Error(`Manager with ID ${managerId} not found`);
    }
};

module.exports = {
    getAllManagers,
    getManagerById,
    addManager,
    getManagerDetails,
    updateManager,
    deleteManager,
};
