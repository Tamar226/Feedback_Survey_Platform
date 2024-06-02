// const mysql = require('mysql2');

// var con = mysql.createConnection({

//     host: "localhost",
//     user: "root",
//     password: "T50226",
//     database: "SurveysDatabase"
// });

// async function getAllPosts() {
//     const result = await con.promise().query('SELECT * FROM posts');
//     return prepareResults(false, 0, 0, result);
// }
// async function getPostById(userId) {
//     try {
//         const result = await con.promise().query('SELECT * FROM posts WHERE userId = ' + userId);
//         if (result.length === 0) {
//             throw new Error(`post with ID ${userId} not found`);
//         }
//         return prepareResult(false, 0, 0, result[0]);
//     } catch (error) {
//         throw error;
//     }
// };

// async function addPost(newPost) {
//     try {
//         const result = await con.promise().query(`INSERT INTO posts (userID, title,body) VALUES ('${newPost.userId}', '${newPost.title}','${newPost.body}')`);
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

// async function updatePost(postId, updatedPostData) {
//     try {
//         const result = await con.promise().query('UPDATE posts SET ? WHERE id = ?', [updatedPostData, postId]);
//         if (result[0].affectedRows > 0) {
//             return prepareResult(false, result[0].affectedRows, 0);
//         }
//         else {
//             return prepareResult(true, 0, 0);
//         }
//     } catch (error) {
//         throw error;
//     }
// }

// async function deletePost(postId) {
//     try {
//         const result = await con.promise().query('DELETE FROM posts WHERE id = ?', postId);
//         if (result[0].affectedRows > 0) {
//             return prepareResult(false, result[0].affectedRows, 0)
//         } else {
//             return prepareResult(true, 0, 0);
//         }
//     } catch (error) {
//         throw error;
//     }
// }
// function prepareResult(hasErrorT = true, affectedRowsT = 0, insertIdT = -1, dataT = null) {
//     const resultdata = {
//         hasError: hasErrorT,
//         affectedRows: affectedRowsT,
//         insertId: insertIdT,
//         data: dataT
//     }
//     return resultdata;
// }
// module.exports = {
//     getAllPosts,
//     getPostById,
//     addPost,
//     updatePost,
//     deletePost
// };

// controllers/surveysController.js

import surveyService from '../services/surveysService';

const getAllSurveys = async (req, res) => {
    try {
        const result = await surveyService.getAllSurveys();
        if (result.hasError) {
            res.status(404).send('Error');
        } else {
            res.status(200).send(['success get all surveys', result]);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const getSurveyById = async (req, res) => {
    const surveyId = req.params.surveyId;
    try {
        const result = await surveyService.getSurveyById(surveyId);
        if (result.hasError) {
            res.status(404).send('Error');
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const addSurvey = async (req, res) => {
    const newSurvey = req.body;
    try {
        const result = await surveyService.addSurvey(newSurvey);
        if (result.insertId > 0) {
            const insertSurvey = await surveyService.getSurveyById(result.insertId);
            res.status(200).send(insertSurvey.data);
        } else {
            res.status(404).send('Error adding survey');
        }
    } catch (error) {
        console.error('Error adding survey:', error);
        res.status(500).send('Internal Server Error');
    }
};

const updateSurvey = async (req, res) => {
    const surveyId = req.params.surveyId;
    const updatedSurveyData = req.body;
    try {
        const result = await surveyService.updateSurvey(surveyId, updatedSurveyData);
        if (result.affectedRows > 0) {
            res.status(200).send(`Survey with ID ${surveyId} updated successfully`);
        } else {
            res.status(404).send(`Survey with ID ${surveyId} not found`);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const deleteSurvey = async (req, res) => {
    const surveyId = req.params.surveyId;
    try {
        const result = await surveyService.deleteSurvey(surveyId);
        if (result.affectedRows > 0) {
            res.status(200).send(`Survey with ID ${surveyId} deleted successfully`);
        } else {
            res.status(404).send(`Survey with ID ${surveyId} not found`);
        }
    } catch (error) {
        console.error('Error deleting survey:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllSurveys,
    getSurveyById,
    addSurvey,
    updateSurvey,
    deleteSurvey
};
