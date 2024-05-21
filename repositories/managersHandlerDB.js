const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "T50226",
    database: "SurveysDatabase"
});

async function getAllManagers() {
    const result = await con.promise().query('SELECT * FROM Managers');
    return prepareResults(false, 0, 0, result);
}

async function getManagerById(ManagerId) {
    try {
        const result = await con.promise().query('SELECT * FROM Managers WHERE id = ?', [ManagerId]);
        if (result.length === 0) {
            throw new Error(`Manager with ID ${postId} not found`);
        }
        return prepareResult(false, 0, 0, result[0]);
    } catch (error) {
        throw error;
    }
}

async function addManager(newManager) {
    try {
        const result = await con.promise().query(`INSERT INTO Managers (name,email,password,company) VALUES ('${newManager.name}','${newManager.email}','${newManager.password}','${newManager.company}')`);
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

async function updateManager(ManagerId, updatedManagerData) {
    try {
        const result = await con.promise().query('UPDATE Managers SET ? WHERE id = ?', [updatedManagerData, ManagerId]);
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

async function deleteManager(ManagerId) {
    try {
        const result = await con.promise().query('DELETE FROM Managers WHERE id = ?', ManagerId);
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
    getAllManagers,
    getManagerById,
    addManager,
    updateManager,
    deleteManager
}