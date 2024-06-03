const mysql = require('mysql2');

var pool = mysql.createPool({
    // host: process.env.MYSQL_HOST,
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD,
    // database: process.env.MYSQL_DATABASE,
    host: 'localhost',
            user: 'root',
            // password: 'a1b2c3d4',
            password: 'T50226',
            database: 'SurveysDatabase',
            port:'3306'
}).promise();

async function getAllSurveys() {
    const result = await pool.query('SELECT * FROM surveys');
    return prepareResult(false, 0, 0, result);
}

async function getSurveyById(SurveyId) {
    try {
        const result = await pool.query('SELECT * FROM Surveys WHERE id = ?', [SurveyId]);
        if (result.length === 0) {
            throw new Error(`Survey with ID ${SurveyId} not found`);
        }
        return prepareResult(false, 0, 0, result[0]);
    } catch (error) {
        throw error;
    }
}

async function addSurvey(newSurvey) {
    try {
        const result = await pool.query(`INSERT INTO surveys (managerId, surveyName, active) VALUES ('${newSurvey.managerId}','${newSurvey.surveyName}','${newSurvey.active}')`);
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

function prepareResult(hasErrorTemp = true, affectedRowsTemp = 0, insertIdTemp = -1, dataTemp = null) {
    return {
        hasError: hasErrorTemp,
        affectedRows: affectedRowsTemp,
        insertId: insertIdTemp,
        data: dataTemp
    };
}

module.exports = {
    getAllSurveys,
    getSurveyById,
    addSurvey,
    updateSurvey,
    deleteSurvey
};
