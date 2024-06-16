const express = require('express');
const surveysRouter = express.Router();
const surveysController = require('../controllers/surveysController');

surveysRouter.get('/', surveysController.getAllSurveys);
surveysRouter.get('/:surveyId', surveysController.getSurveyById);
surveysRouter.post('/', surveysController.addSurvey);
surveysRouter.put('/:surveyId', surveysController.updateSurvey);
surveysRouter.delete('/:surveyId', surveysController.deleteSurvey);
surveysRouter.post('/:surveyId/results', surveysController.submitSurveyResults);


module.exports = surveysRouter;
