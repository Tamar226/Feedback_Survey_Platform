const answersService = require('../services/answersService');

const getAllAnswers = async (req, res) => {
    try {
        const result = await answersService.getAllAnswers();
        if (result.hasError) {
            res.status(404).send('Error');
        } else {
            res.status(200).send(['success get all answers', result]);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const getAnswerById = async (req, res) => {
    const id = req.params.answerId;
    try {
        const answer = await answersService.getAnswerById(id);
        res.status(200).send(answer);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const getAnswersByQuestionId = async (req, res) => {
    const id = req.params.questionId;
    try {
        const answers = await answersService.getAnswersByQuestionId(id);
        res.status(200).send(answers);
    } catch (error) {
        res.status(404).send(error.message);
    }
};
const addAnswer = async (req, res) => {
    const newAnswer = req.body;
    try {
        const result = await answersService.addAnswer(newAnswer);
        if (result.length > 0 && result[0].id > 0) {
            const insertAnswer = await answersService.getAnswerById(result[0].id);
            res.status(200).send(insertAnswer);
        } else {
            res.status(404).json('Error adding answer');
        }
    } catch (error) {
        console.error('Error adding answer:', error);
        res.status(500).send('Internal Server Error');
    }
};

const updateAnswer = async (req, res) => {
    const answerId = req.params.answerId;
    const updatedAnswerData = req.body;
    try {
        const updateMessage = await answersService.updateAnswer(answerId, updatedAnswerData);
        res.status(200).send(updateMessage);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const deleteAnswer = async (req, res) => {
    const answerId = req.params.answerId;
    try {
        const deleteMessage = await answersService.deleteAnswer(answerId);
        res.status(200).send(deleteMessage);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

module.exports = {
    getAllAnswers,
    getAnswerById,
    getAnswersByQuestionId,
    addAnswer,
    updateAnswer,
    deleteAnswer
};
