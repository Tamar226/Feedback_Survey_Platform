
const managerDataBase = require('../repositories/managersHandlerDB');

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
    updateManager,
    deleteManager,
};
