const express = require('express');
const questionsRouter = express.Router();
const questionsController = require('../controllers/questionsController');

questionsRouter.get('/', questionsController.getAllQuestions);
questionsRouter.get('/:questionId', questionsController.getQuestionById);
questionsRouter.get('/surveys/:surveyId',questionsController.getQuestionsBySurveyId)
questionsRouter.post('/', questionsController.addQuestion);
questionsRouter.put('/:questionId', questionsController.updateQuestion);
questionsRouter.delete('/:questionId', questionsController.deleteQuestion);

module.exports = questionsRouter;
