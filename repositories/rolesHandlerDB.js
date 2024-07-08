const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({path:'../.env'});

var pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: 'localhost',
    // password: 'T50226',
    password: '1570',
        user: 'root',
    database:'surveysdatabase'
}).promise();

async function getAllRoles() {
    const result = await pool.query('SELECT * FROM Roles');
    if (result.length === 0) {
        throw new Error('No roles found');
    }
    return prepareResult(false, 0, 0, result);
}

async function getRoleByName(roleName) {
    const result = await pool.query('SELECT * FROM Roles WHERE name = ?', [roleName]);
    if (result.length === 0) {
        throw new Error(`Role with NAME ${roleName} not found`);
    }
    return prepareResult(false, 0, 0, result[0]);
}

async function addRole(newRole) {
    try {
        const result = await pool.query(`INSERT INTO Roles (name) VALUES ('${newRole.name}')`);
        const lastInsertId = await pool.query('SELECT LAST_INSERT_ID() AS id');
        if (lastInsertId[0][0].id >= 0) {
            return prepareResult(false, 0, lastInsertId[0][0].id);
        } else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }    
}

async function updateRole(roleName, updateRoleData) {
    try {
        const result = await pool.query(`UPDATE Roles SET name = '${updateRoleData.name}'`);
        if (result.affectedRows > 0) {
            return prepareResult(false, 0, result.affectedRows)
        }
        else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}

async function deleteRole(roleName) {
    try {
        const result = await pool.query('DELETE FROM Roles WHERE id = ?', [roleName]);
        if (result.affectedRows > 0) {
            return prepareResult(false, 0, result.affectedRows)
        }
        else {
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

module.exports ={
    getAllRoles,
    getRoleByName,
    addRole,
    updateRole,
    deleteRole
};