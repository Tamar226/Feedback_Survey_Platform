const express = require('express');
const questionsRouter = express.Router();
const questionsController = require('../controllers/questionsController');

questionsRouter.get('/', questionsController.getAllQuestions);
questionsRouter.get('/:questionId', questionsController.getQuestionById);
questionsRouter.post('/', questionsController.addQuestion);
questionsRouter.put('/:questionId', questionsController.updateQuestion);
questionsRouter.delete('/:questionId', questionsController.deleteQuestion);

module.exports = questionsRouter;
