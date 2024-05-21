
const usersDataBase = require('../repositories/usersHandlerDB');

const getAllUsers = async () => {
    const result = await usersDataBase.getAllUsers();
    if (result.hasError) {
        throw new Error('Error fetching users');
    }
    return result.data;
};

const getUserById = async (id) => {
    const result = await usersDataBase.getUserById(id);
    if (result.hasError) {
        throw new Error(`User with ID ${id} not found`);
    }
    return result.data;
};

const addUser = async (newUser) => {
    const result = await usersDataBase.addUser(newUser);
    if (result.insertId > 0) {
        const insertUser = await usersDataBase.getUserById(result.insertId);
        return insertUser.data;
    } else {
        throw new Error('Error adding user');
    }
};

const updateUser = async (userId, updatedUserData) => {
    const result = await usersDataBase.updateUser(userId, updatedUserData);
    if (result.affectedRows > 0) {
        return `User with ID ${userId} updated successfully`;
    } else {
        throw new Error(`User with ID ${userId} not found`);
    }
};

const deleteUser = async (userId) => {
    const result = await usersDataBase.deleteUser(userId);
    if (result.affectedRows > 0) {
        return `User with ID ${userId} deleted successfully`;
    } else {
        throw new Error(`User with ID ${userId} not found`);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
};
