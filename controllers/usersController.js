
const userService = require('../services/usersService');
const managerService = require('../services/managersService');
const roleRelationService = require('../services/roleRelationService');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).send([users[0]]);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userService.getUserById(id);
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const addUser = async (req, res) => {
    const newUser = req.body;
    try {
        const hashPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashPassword;
        const addedUser = await userService.addUser(newUser);
        let addedUserHash = addedUser[0];
        delete addedUserHash.password;
        res.status(200).send([addedUserHash]);
    } catch (error) {
        console.error('Error adding user in controllers:', error);
        res.status(500).send('Internal Server Error');
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = { ...req.body };
    delete updatedUserData.password;
    try {
        const updateMessage = await userService.updateUser(userId, updatedUserData);
        res.status(200).send(updateMessage);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const loginUser = async (req, res) => {

    try {
        const userName = req.body.username;
        const password = req.body.password;
        const userRelation = await roleRelationService.getRelationByUsername(userName);
        if (userRelation.length > 0) {
            const userRole = userRelation[0].roleName;
            if (userRole=='manager'){
                const result = await managerService.getManagerDetails(userName, password);
                if (result.hasError) {
                    res.status(401).send('Authentication failed');
                } else {
                    res.status(200).json([result.manager, 'manager']);
                }
            }
            else{
                const result = await userService.getUserDetails(userName, password);
                if (result.hasError) {
                    res.status(401).send('Authentication failed');
                } else {
                    res.status(200).json([result.user, 'user']);
                }
            }
        }
    } catch (error) {
        console.error('an error in userscontroller:' + error);
        res.status(500).send('Internal Server Error');
    }
};


const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const deleteMessage = await userService.deleteUser(userId);
        res.status(200).send(deleteMessage);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    loginUser,
    deleteUser,
};
