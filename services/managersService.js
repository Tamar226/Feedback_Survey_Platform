
const managerDataBase = require('../repositories/managersHandlerDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // יש לשמור בסוד את ה-secret

const getAllManagers = async () => {
    const result = await managerDataBase.getAllManagers();
    if (result.hasError) {
        throw new Error('Error fetching managers');
    }
    return result.data;
};

const getManagerById = async (id) => {
    const result = await managerDataBase.getManagerById(id);
    if (result.hasError) {
        throw new Error(`Manager with ID ${id} not found`);
    }
    return result.data;
};

const addManager = async (newManager) => {
    const result = await managerDataBase.addManager(newManager);
    if (result.insertId > 0) {
        const insertManager = await managerDataBase.getManagerById(result.insertId);
        return insertManager.data;
    } else {
        throw new Error('Error adding manager');
    }
};

async function getManagerDetails(userName, password) {
    try {
        const rows = await managerDataBase.findManagerByUsername(userName);
        if (rows.length === 0) {
            throw new Error('Manager not found');
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        return {
            hasError: false,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                company: user.company
            },
            token
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}


const updateManager = async (managerId, updatedManagerData) => {
    const result = await managerDataBase.updateManager(managerId, updatedManagerData);
    if (result.affectedRows > 0) {
        return `Manager with ID ${managerId} updated successfully`;
    } else {
        throw new Error(`Manager with ID ${managerId} not found`);
    }
};

const deleteManager = async (managerId) => {
    const result = await managerDataBase.deleteManager(managerId);
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
