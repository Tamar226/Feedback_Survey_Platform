
const userDataBase = require('../repositories/usersHandlerDB');
const roleRelationService = require('./roleRelationService');
const rolesService = require('./rolesService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = /*process.env.JWT_SECRET*/'546442' || 'your_jwt_secret'; // יש לשמור בסוד את ה-secret

const getAllUsers = async () => {
    const result = await userDataBase.getAllUsers();
    if (result.hasError) {
        throw new Error('Error fetching users');
    }
    return result.data;
};

const getUserById = async (id) => {
    const result = await userDataBase.getUserById(id);
    let resultWithoutPassword = { ...result.data[0] }; // deep copy
    delete resultWithoutPassword.password;
    if (result.hasError) {
        throw new Error(`User with ID ${id} not found`);
    }
    return resultWithoutPassword;
};

const addUser = async (newUser) => {
    // Get the role ID for 'user'
    const userRole = await rolesService.getRoleByName('user');

    // Add new relation to roleRelation table
    const newRelation = {
        username: newUser.username,
        roleName: userRole[0].name 
    };
    await roleRelationService.addRelation(newRelation);

    const result = await userDataBase.addUser(newUser);
    if (result.insertId >= 0) {
        const insertUser = await userDataBase.getUserById(result.insertId);
        return insertUser.data;
    } else {
        throw new Error('Error adding user');
    }
};

async function getUserDetails(userName, password) {
    try {
        const rows = await userDataBase.findUserByUsername(userName);
        if (rows.length === 0) {
            throw new Error('User not found');
        }
        const user = rows[0][0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);

        return {
            hasError: false,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                city: user.city,
                age: user.age,
                gender: user.gender,
                job: user.job
            },
            token
        };
    } catch (error) {
        console.error("error in services", error);
        throw error;
    }
}


const updateUser = async (userId, updatedUserData) => {
    const result = await userDataBase.updateUser(userId, updatedUserData);
    if (result.affectedRows > 0) {
        return `User with ID ${userId} updated successfully`;
    } else {
        throw new Error(`User with ID ${userId} not found`);
    }
};

const deleteUser = async (userId) => {
    const result = await userDataBase.deleteUser(userId);
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
    getUserDetails,
    updateUser,
    deleteUser,
};
