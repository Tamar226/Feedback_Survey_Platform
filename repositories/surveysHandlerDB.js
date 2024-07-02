const mysql = require('mysql2');
const dotenv = require ('dotenv');
dotenv.config({path:'../.env'});

var pool = mysql.createPool({
    // host: process.env.MYSQL_HOST,
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD,
    // database: process.env.MYSQL_DATABASE,
    host: 'localhost',
    user: 'root',
    // password: 'a1b2c3d4',
    // password: 'T50226',
    password: '1570',
    database: 'SurveysDatabase',
    port: '3306'
}).promise();

async function getAllSurveys() {
    const result = await pool.query('SELECT * FROM surveys');
    return prepareResult(false, 0, 0, result);
}
async function getSurveyById(surveyId) {
    try {
        const result = await pool.query('SELECT * FROM surveys WHERE id = ?', [surveyId]);

        if (result.length === 0) {
            throw new Error(`Survey with ID ${surveyId} not found`);
        }
        return prepareResult(false, 0, 0, result[0]);
    } catch (error) {
        throw error;
    }
}

async function getSurveysBySearch(searchText) {
    try {
        const query = `
            SELECT *
            FROM surveys
            WHERE surveyName LIKE ?
               OR managerId LIKE ?
               OR active = ?
        `;
        const params = [`%${searchText}%`, `%${searchText}%`, searchText === 'active' ? 1 : 0];
        const results = await pool.query(query, params);

        if (results.length === 0) {
            return prepareResult(true, 0, -1, null); 
        } else {
            return prepareResult(false, results.length, -1, results); 
        }
    } catch (error) {
        throw error;
    }
}

async function addSurvey(newSurvey) {
    try {
        const result = await pool.query(`
            INSERT INTO Surveys (userId, surveyName, active, category) 
            VALUES (?, ?, ?, ?)`, 
            [newSurvey.userId, newSurvey.surveyName, newSurvey.active, newSurvey.category]
        );
        
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

async function deleteSurveyById(surveyId) {
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

const saveAnswer = async (surveyId, answerId, userId) => {
    const query = 'INSERT INTO results (surveyId, answerId, userId) VALUES (?, ?, ?)';
    const values = [surveyId, answerId, userId];
    try {
        await pool.execute(query, values);
    } catch (error) {
        console.error('Error in saveAnswer repository:', error);
        throw error;
    }
};

const getSurveyResults = async (surveyId) => {
    const query = `
        SELECT s.surveyName, q.id as questionId, q.question, a.id as answerId, a.answer, COUNT(r.answerId) as count, r.userId
        FROM results r
        JOIN answers a ON r.answerId = a.id
        JOIN questions q ON a.questionId = q.id
        JOIN surveys s ON r.surveyId = s.id
        WHERE r.surveyId = ?
        GROUP BY s.surveyName, q.id, a.id, r.userId`;

    console.log('Executing query with surveyId:', surveyId);

    try {
        const [results] = await pool.execute(query, [surveyId]);
        console.log('Query results:', results);
        
        // Check if results are empty and return an object with surveyId if so
        if (results.length === 0) {
            return prepareResult(false, 0, -1, { surveyId, questions: [], userIds: [] });
        }

        return prepareResult(false, results.length, -1, results);
    } catch (error) {
        console.error('Error fetching survey results:', error);
        return prepareResult(true, 0, -1, null);
    }
};


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
    getSurveysBySearch,
    addSurvey,
    updateSurvey,
    deleteSurveyById,
    saveAnswer,
    getSurveyResults
};
