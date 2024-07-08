
const userDataBase = require('../repositories/usersHandlerDB');
const roleRelationService = require('./roleRelationService');
const rolesService = require('./rolesService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const path = require('path');
const { log } = require('console');
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
    try {
        // Get the role ID for 'user'
        const userRole = await rolesService.getRoleByName('user');

        // Add new relation to roleRelation table
        const newRelation = {
            username: newUser.username,
            roleName: userRole[0].name
        };
        await roleRelationService.addRelation(newRelation);

        // Upload profile image if provided
        if (newUser.profileImage!==undefined ) {
            console.log('Uploading profile image');
            const imagePath = await uploadProfileImage(newUser.profileImage, newUser.username);
            newUser.profileImage = imagePath;
        }

        const result = await userDataBase.addUser(newUser);
        console.log(result);
        if (result.insertId >= 0) {
            const insertUser = await userDataBase.getUserById(result.insertId);

            let url = insertUser.profileImage
            let imageBase64=null; //if the picture will not upload
            if (url){
                const imagePath = path.resolve(__dirname, url.profile_);
                const imageData = await fs.promises.readFile(imagePath);
                const imageBase64 = Buffer.from(imageData).toString('base64');
            }
            return {
                data: insertUser.data,
                imageBase64: imageBase64
            };
        } else {
            throw new Error('Error adding user');
        }
    } catch (error) {
        throw error;
    }
};

async function uploadProfileImage(file, username) {
    console.log(file);
    try {
        const newFileName = `userProfile_${username}.png`;
        const imagesBasePath = path.join(__dirname, '../profileImage');

        await fs.promises.mkdir(imagesBasePath, { recursive: true });

        const fileBuffer = file.buffer;
        const filePath = path.join(imagesBasePath, newFileName);

        await fs.promises.writeFile(filePath, fileBuffer);
        console.log(`../profileImage/${newFileName}`);
        return `../profileImage/${newFileName}`;
    } catch (error) {
        console.error('Error uploading profile image:', error);
        throw error;
    }
}

async function getUserDetails(userName, password) {
    try {
        console.log(userName, password);
        const rows = await userDataBase.findUserByUsername(userName);
        if (rows.length === 0) {
            throw new Error('משתמש לא נמצא');
        }
        const user = rows[0][0];

        // בודקים שהסיסמה מועברת כראוי לפונקציה bcrypt.compare
        if (!password || typeof password !== 'string') {
            throw new Error('סיסמה לא תקינה');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('סיסמה שגויה');
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
                job: user.job,
                profileImage: user.profileImage // כלול את תמונת הפרופיל
            },
            token
        };
    } catch (error) {
        console.error("שגיאה בשירותים", error);
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
