const surveysDataBase = require('../repositories/surveysHandlerDB');

async function getAllSurveys() {
    try {
        return await surveysRepository.getAllSurveys();
    } catch (error) {
        throw error;
    }
}

async function getSurveyById(surveyId) {
    try {
        return await surveysRepository.getSurveyById(surveyId);
    } catch (error) {
        throw error;
    }
}

async function addSurvey(newSurvey) {
    try {
        return await surveysRepository.addSurvey(newSurvey);
    } catch (error) {
        throw error;
    }
}

async function updateSurvey(surveyId, updatedSurveyData) {
    try {
        return await surveysRepository.updateSurvey(surveyId, updatedSurveyData);
    } catch (error) {
        throw error;
    }
}

async function deleteSurvey(surveyId) {
    try {
        return await surveysRepository.deleteSurvey(surveyId);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllSurveys,
    getSurveyById,
    addSurvey,
    updateSurvey,
    deleteSurvey
};
