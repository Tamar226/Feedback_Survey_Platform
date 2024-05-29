const usersService = require('../services/usersService');
// const questionsService = require('../services/questionService');
// const postsDataBase = require('../../database/postsHandlerDB');
// const commentsDataBase = require('../../database/commentsHandlerDB');

const getAllUsers = async (req, res) => {
    try {
        const result = await usersService.getAllUsers();
        if (result.hasError) {
            res.status(404).send('Error');
        } else {
            res.status(200).send(['success get all users', result]);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const getUserById = async (req, res) => {
    const userId = req.params.userId;
    try {
        const result = await usersService.getUserById(userId);
        if (result.hasError) {
            res.status(404).send('Error');
        } else {
            res.status(200).send([`success get user by id: ${userId}`, result]);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

// const getUserInformation = async (req, res) => {
//     const userId = req.params.userId;
//     const type = req.params.typeInformetion;
//     try {
//         var result;
//         switch (type) {
//             case 'posts':
//                 result = await postsDataBase.getPostById(userId);
//                 break;
//             case 'todos':
//                 result = await questionsService.getTodoById(userId);
//                 break;
//             case 'comments':
//                 result = await commentsDataBase.getCommentById(userId);
//                 break;
//             default:
//                 break;
//         }
//         if (result.hasError) {
//             res.status(404).send('Error');
//         } else {
//             res.status(200).send(result.data);
//         }
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// };

const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    try {
        const result = await usersService.updateUser(userId, updatedUserData);
        if (result.affectedRows > 0) {
            res.status(200).send(`User with ID ${userId} updated successfully`);
        } else {
            res.status(404).send(`User with ID ${userId} not found`);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const result = await usersService.deleteUser(userId);
        if (result.affectedRows > 0) {
            res.status(200).send(`User with ID ${userId} deleted successfully`);
        } else {
            res.status(404).send(`User with ID ${userId} not found`);
        }
    } catch (error) {
        console.error('Error deleting user in controllers:', error);
        res.status(500).send('Internal Server Error');
    }
};

const addUser = async (req, res) => {
    const newUser = req.body;
    try {
        const addedUser = await usersService.addUser(newUser);
        res.status(200).send(addedUser);
    } catch (error) {
        console.error('Error adding manager in controllers:', error);
        res.status(500).send('Internal Server Error');
    }
};
const registerUser = async (req, res) => {
    const newUser = req.body;
    try {
        const find = await usersService.getUserByUsername(newUser.username);
        if (find.affectedRows != 0) {
            res.status(404).send('User already registered');
            return;
        }
        const resultRegister = await usersService.addUser(newUser);
        if (resultRegister.insertId > 0) {
            res.status(201).send(`User added with ID: ${resultRegister.insertId}`);
        } else {
            res.status(404).send('User registration failed');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const loginUser = async (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;
    try {
        const result = await usersService.getUserDetails(userName, password);
        if (result.hasError) {
            res.status(404).send('Error');
        } else {
            res.status(200).send(JSON.stringify(result));
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    // getUserInformation,
    updateUser,
    deleteUser,
    addUser,
    registerUser,
    loginUser
};
