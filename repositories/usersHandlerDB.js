const mysql = require('mysql2');
const dotenv = require ('dotenv');
dotenv.config({path:'../.env'});


var pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    // host: 'localhost',
    // user: 'root',
    // password: 'T50226',
    // password: '1570',
    // database: 'SurveysDatabase',
    // port: '3306'
}).promise();

async function getAllUsers() {
    const result = await pool.query('SELECT * FROM Users');
    return prepareResult(false, 0, 0, result);
}

async function getUserById(UserId) {
    try {
        const result = await pool.query('SELECT * FROM Users WHERE id = ?', [UserId]);
        if (result.length === 0) {
            throw new Error(`User with ID ${UserId} not found`);
        }
        return prepareResult(false, 0, 0, result[0]);
    } catch (error) {
        throw error;
    }
}

async function addUser(newUser) {
    try {
        const result = await pool.query(`INSERT INTO Users (name,username,email,password,city, age, gender, job, company) VALUES ('${newUser.name}','${newUser.username}','${newUser.email}','${newUser.password}','${newUser.city}','${newUser.age}','${newUser.gender}','${newUser.job}','${newUser.company}')`);
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

async function findUserByUsername(username) {
    try {
        const rows = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);
        return rows;
    } catch (error) {
        console.error("error in handler DB", error);
        throw error;
    }
}

async function updateUser(UserId, updatedUserData) {
    try {
        const result = await pool.query('UPDATE Users SET ? WHERE id = ?', [updatedUserData, UserId]);
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

async function deleteUser(UserId) {
    try {
        const result = await pool.query('DELETE FROM Users WHERE id = ?', UserId);
        if (result[0].affectedRows > 0) {
            return prepareResult(false, result[0].affectedRows, 0)

        } else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
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
    findUserByUsername,
    updateUser,
    deleteUser
}