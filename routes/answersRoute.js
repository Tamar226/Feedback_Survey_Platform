const express = require('express');
const answersRouter = express.Router();
const answersController = require('../controllers/answersController');

answersRouter.get('/', answersController.getAllAnswers);
answersRouter.get('/:answerId', answersController.getAnswerById);
answersRouter.get('/questions/:questionId',answersController.getAnswersByQuestionId)
answersRouter.post('/', answersController.addAnswer);
answersRouter.put('/:answerId', answersController.updateAnswer);
answersRouter.delete('/:answerId', answersController.deleteAnswer);

module.exports = answersRouter;
