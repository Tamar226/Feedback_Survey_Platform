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
    // password: '1570',
    database: 'SurveysDatabase',
    port: '3306'
}).promise();

async function getAllAnswers() {
    const result = await pool.query('SELECT * FROM answers');
    return prepareResult(false, 0, 0, result);
}

async function getAnswerById(answerId) {
    try {
        const result = await pool.query('SELECT * FROM answers WHERE Id = ?', [answerId]);
        if (result.length === 0) {
            throw new Error(`Answer with ID ${answerId} not found`);
        }
        return prepareResult(false, 0, 0, result[0]);

    } catch (error) {
        throw error;
    }
}

async function getAnswersByQuestionId (questionId) {
    try {
        const result = await pool.query('SELECT * FROM answers WHERE questionId = ?', [questionId]);
        if (result.length === 0) {
            throw new Error(`Answer with question ID ${questionId} not found`);
        }
        return prepareResult(false, 0, 0, result[0]);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
async function addAnswer(newAnswer) {
    try {
        if (newAnswer.completed) {
            newAnswer.completed = 1;
        }
        else
            newAnswer.completed = 0;
        const result = await pool.query(`INSERT INTO answers (answer, questionId,answerId) VALUES ('${newAnswer.answer}', '${newAnswer.questionId}','${newAnswer.answerId}')`);
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

async function updateAnswer(answerId, updatedAnswerData) {
    try {
        const result = await pool.query('UPDATE answers SET ? WHERE id = ?', [updatedAnswerData, answerId]);
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

async function deleteAnswer(answerId) {
    try {
        const result = await pool.query('DELETE FROM answers WHERE id = ?', [answerId]);
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
    getAllAnswers,
    getAnswerById,
    getAnswersByQuestionId,
    addAnswer,
    updateAnswer,
    deleteAnswer
};
