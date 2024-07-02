const express = require('express');
const surveysRouter = express.Router();
const surveysController = require('../controllers/surveysController');
const getUserRoleFromToken = require('../middleware/getUserRoleFromToken');

surveysRouter.get('/', surveysController.getAllSurveys);
surveysRouter.get('/:surveyId', surveysController.getSurveyById);
surveysRouter.get('/:search', surveysController.getSurveysBySearch);
surveysRouter.post('/', getUserRoleFromToken, surveysController.addSurvey);
surveysRouter.put('/:surveyId', surveysController.updateSurvey);
surveysRouter.delete('/:surveyId', surveysController.deleteSurvey);
surveysRouter.post('/:surveyId/submitResults', surveysController.submitSurveyResults);
surveysRouter.get('/:surveyId/results', surveysController.getSurveyResults);




module.exports = surveysRouter;
