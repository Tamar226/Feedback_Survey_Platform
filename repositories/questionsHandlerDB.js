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
    // // password: 'a1b2c3d4',
    // password: 'T50226',
    // // password: '1570',
    // database: 'SurveysDatabase',
    // port: '3306'
}).promise();


async function getAllQuestions() {
    const result = await pool.query('SELECT * FROM questions');
    return prepareResult(false, 0, 0, result);
}

async function getQuestionById(questionId) {
    try {
        const result = await pool.query('SELECT * FROM questions WHERE Id = ?', [questionId]);
        if (result.length === 0) {
            throw new Error(`Question with ID ${questionId} not found`);
        }
        return prepareResult(false, 0, 0, result[0]);

    } catch (error) {
        throw error;
    }
}

async function getQuestionsBySurveyId (surveyId) {
    try {
        const result = await pool.query('SELECT * FROM questions WHERE surveyID = ?', [surveyId]);
        if (result.length === 0) {
            throw new Error(`Question with ID ${questionId} not found`);
        }
        return prepareResult(false, 0, 0, result[0]);
    } catch (error) {
        console.error(error);
        throw error;
    }
};
// async function addQuestion(newQuestion) {
//     try {
//         if (newQuestion.completed) {
//             newQuestion.completed = 1;
//         }
//         else
//             newQuestion.completed = 0;
//         const result = await pool.query(`INSERT INTO questions (question, surveyID) VALUES ('${newQuestion.question}', '${newQuestion.surveyID}')`);
//         if (result[0].insertId > 0) {
//             return prepareResult(false, 0, result[0].insertId)
//         }
//         else {
//             return prepareResult(true, 0, 0);
//         }
//     } catch (error) {
//         throw error;
//     }
// }
const addQuestion = async (newQuestion) => {
    try {
        const result = await pool.query(`INSERT INTO questions (question, surveyID) VALUES ('${newQuestion.question}', '${newQuestion.surveyID}')`);
        if (result[0].insertId > 0) {
            return prepareResult(false, 0, result[0].insertId);
        } else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
};

async function updateQuestion(questionId, updatedQuestionData) {
    try {
        const result = await pool.query('UPDATE questions SET ? WHERE id = ?', [updatedQuestionData, questionId]);
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

async function deleteQuestion(questionId) {
    try {
        const result = await pool.query('DELETE FROM questions WHERE id = ?', [questionId]);
        if (result[0].affectedRows > 0) {
            return prepareResult(false, result[0].affectedRows, 0)

        } else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}
const deleteQuestionsBySurveyId = async (surveyId) => {
    try {
        const result = await pool.query('DELETE FROM questions WHERE surveyId = ?', [surveyId]);
        if (result[0].affectedRows > 0) {
            return prepareResult(false, result[0].affectedRows, 0);
        } else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
};

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
    getAllQuestions,
    getQuestionById,
    getQuestionsBySurveyId,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    deleteQuestionsBySurveyId
};