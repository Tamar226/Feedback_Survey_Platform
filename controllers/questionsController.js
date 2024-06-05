const questionservice = require('../services/questionService');

const getAllQuestions = async (req, res) => {
    try {
        const result = await questionservice.getAllQuestions();
        if (result.hasError) {
            res.status(404).send('Error');
        } else {
            res.status(200).send(['success get all questions', result]);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const getQuestionById = async (req, res) => {
    const id = req.params.questionId;
    try {
        const Question = await questionservice.getQuestionById(id);
        res.status(200).send(Question);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const addQuestion = async (req, res) => {
    const newQuestion = req.body;
    try {
        const result = await questionservice.addQuestion(newQuestion);
        if (result.length > 0 && result[0].id > 0) {
            const insertQuestion = await questionservice.getQuestionById(result[0].id);
            res.status(200).send(insertQuestion);
        } else {
            res.status(404).json('Error adding question');
        }
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).send('Internal Server Error');
    }
};

const updateQuestion = async (req, res) => {
    const questionId = req.params.questionId;
    const updatedQuestionData = req.body;
    try {
        const updateMessage = await questionservice.updateQuestion(questionId, updatedQuestionData);
        res.status(200).send(updateMessage);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const deleteQuestion = async (req, res) => {
    const questionId = req.params.questionId;
    try {
        const deleteMessage = await questionservice.deleteQuestion(questionId);
        res.status(200).send(deleteMessage);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

module.exports = {
    getAllQuestions,
    getQuestionById,
    addQuestion,
    updateQuestion,
    deleteQuestion
};
