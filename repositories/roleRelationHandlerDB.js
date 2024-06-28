const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config({path:'../.env'});
dotenv.config();

var pool = mysql.createPool({
    // host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: 'localhost',
    // user: 'root',
    // // password: 'a1b2c3d4',
    password: 'T50226',
    // password: '1570',
    // database: 'SurveysDatabase',
    // port: '3306'
});

async function getAllRoleRelations() {
    const result = await pool.query('SELECT * FROM RoleRelation');
    if (result.length===0){
        throw new Error('No relations found');
    }
    return prepareResult(false, 0, 0, result[0]);
}

async function getRelationByUsername(relationUsername) {
    const result = await pool.query('SELECT * FROM RoleRelation WHERE username = ?', [relationUsername]);
    if (result.length === 0) {
        throw new Error(`Relation with username ${relationUsername} is not found`);
    }
    return prepareResult(false, 0, 0, result[0]);
}

async function addRelation(newRelation) {
    try {
        const result = await pool.query(`INSERT INTO RoleRelation (username, roleName) VALUES ('${newRelation.username}', '${newRelation.roleName}')`);
        if (result[0].insertId > 0) {
            return prepareResult(false, 0, result[0].insertId);
        }
        else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}

async function updateRelation(relationUsername, updateRelationData) {
    try {
        const result = await pool.query(`UPDATE RoleRelation SET roleName = '${updateRelationData.role}' WHERE username = '${relationUsername}'`);
        if (result[0].affectedRows > 0) {
            const [rows] = await pool.query(`SELECT * FROM RoleRelation WHERE username = ?`, [relationUsername]);
            const updatedUser = rows[0];
            return prepareResult(false, 0, result[0].affectedRows, updatedUser);
        }
        else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}

async function deleteRelation(relationUsername) {
    try {
        const result = await pool.query(`DELETE FROM RoleRelation WHERE username = '${relationUsername}'`);
        if (result.affectedRows > 0) {
            return prepareResult(false, 0, result.affectedRows);
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

module.exports = {
    getAllRoleRelations,
    getRelationByUsername,
    addRelation,
    updateRelation,
    deleteRelation,
    prepareResult
}