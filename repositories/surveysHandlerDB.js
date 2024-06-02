const mysql = require('mysql2');

var pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

async function getAllSurveys() {
    const result = await pool.query('SELECT * FROM surveys');
    return prepareResult(false, 0, 0, result);
}

async function getSurveyById(surveyId) {
    try {
        const result = await pool.query('SELECT * FROM surveys WHERE id = ?', [surveyId]);
        if (result[0].length === 0) {
            throw new Error(`Survey with ID ${surveyId} not found`);
        }
        return prepareResult(false, 0, 0, result[0][0]);
    } catch (error) {
        throw error;
    }
}

async function addSurvey(newSurvey) {
    try {
        const result = await pool.query(`INSERT INTO surveys (userID, title, body) VALUES (?, ?, ?)`, [newSurvey.userId, newSurvey.title, newSurvey.body]);
        if (result[0].insertId > 0) {
            return prepareResult(false, 0, result[0].insertId);
        } else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}

async function updateSurvey(surveyId, updatedSurveyData) {
    try {
        const result = await pool.query('UPDATE surveys SET ? WHERE id = ?', [updatedSurveyData, surveyId]);
        if (result[0].affectedRows > 0) {
            return prepareResult(false, result[0].affectedRows, 0);
        } else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}

async function deleteSurvey(surveyId) {
    try {
        const result = await pool.query('DELETE FROM surveys WHERE id = ?', [surveyId]);
        if (result[0].affectedRows > 0) {
            return prepareResult(false, result[0].affectedRows, 0);
        } else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}

function prepareResult(hasErrorT = true, affectedRowsT = 0, insertIdT = -1, dataT = null) {
    return {
        hasError: hasErrorT,
        affectedRows: affectedRowsT,
        insertId: insertIdT,
        data: dataT
    };
}

module.exports = {
    getAllSurveys,
    getSurveyById,
    addSurvey,
    updateSurvey,
    deleteSurvey
};
