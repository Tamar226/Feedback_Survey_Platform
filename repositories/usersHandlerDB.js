const mysql = require('mysql2');
require('dotenv').config();

var pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

// var pool = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "T50226",
//     database: "SurveysDatabase"
// });

async function getAllUsers() {
    const result = await pool.query('SELECT * FROM users');
    return prepareResult(false, 0, 0, result);
}

async function getUserById(userId) {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
        if (result.length === 0) {
            throw new Error(`User with ID ${userId} not found`);
        }
        return prepareResult(false, 0, 0, result);
    } catch (error) {
        throw error;
    }
}

async function addUser(newUser) {
    try {
        const result = await pool.query(`INSERT INTO users (name, username, email,password,city,age, gender, job) VALUES ('${newUser.name}', '${newUser.username}', '${newUser.email}', '${newUser.password}','${newUser.city}', '${newUser.age}', '${newUser.gender}','${newUser.job}')`);
        if (result[0].insertId > 0) {
            return prepareResult(false, 0, result[0].insertId)
        }
        else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}

async function updateUser(userId, updatedUserData) {
    try {
        const result = await pool.query('UPDATE users SET ? WHERE id = ?', [updatedUserData, userId]);
        if (result[0].affectedRows > 0) {
            return prepareResult(false, result[0].affectedRows, 0)
        }
        else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}

async function deleteUser(userId) {
    try {
        const result = await pool.query('DELETE FROM users WHERE id = ?', userId);
        if (result[0].affectedRows > 0) {
            return prepareResult(false, result[0].affectedRows, 0)

        } else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}

async function getUserByUsername(username) {
    return await pool.query('SELECT * FROM users WHERE username =?', username);
}
async function getUserDetails(userName, password) {
    try {
        let query = `SELECT username FROM passwords WHERE username = '${userName}' AND password = '${password}'`;
        const result = await pool.query(query);
        if (result.length === 0) {
            throw new Error(`User not found`);
        }
        const userDetails = await getUserByUsername(result[0][0].username)
        return prepareResult(false, result[0].affectedRows, 0, userDetails[0][0])
    } catch (error) {
        console.error("error in handleUser", error);
        throw error;
    }
}

function prepareResult(hasErrorTemp = true, affectedRowsTemp = 0, insertIdTemp = -1, dataTemp = null) {
    const resultdata = {
        hasError: hasErrorTemp,
        affectedRows: affectedRowsTemp,
        insertId: insertIdTemp,
        data: dataTemp
    }
    return resultdata;
}
module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    getUserDetails
};