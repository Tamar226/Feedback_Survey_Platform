const surveysRepository = require('../repositories/surveysHandlerDB');

async function getAllSurveys() {
    const result = await surveysRepository.getAllSurveys();
    if (result.hasError) {
        throw new Error('Error fetching surveys');
    }
    return result.data;
}

const getSurveyById = async (surveyId) => {
    const result = await surveysRepository.getSurveyById(surveyId);
    if (result.hasError) {
        throw new Error(`Survey with ID ${id} not found`);
    }
    return result.data;
};

const addSurvey = async (newSurvey) => {
    const result = await surveysRepository.addSurvey(newSurvey);
    if (result.insertId > 0) {
        const insertSurvey = await surveysRepository.getSurveyById(result.insertId);
        return insertSurvey.data;
    }
}

async function updateSurvey(surveyId, updatedSurveyData) {
    const result = await surveysRepository.updateSurvey(surveyId, updatedSurveyData);
    if (result.affectedRows > 0) {
        return `Survey with ID ${surveyId} updated successfully`;
    } else {
        throw new Error(`Survey with ID ${surveyId} not found`);
    }
}

async function deleteSurvey(surveyId) {
    const result = await surveysRepository.deleteSurvey(surveyId);
    if (result.affectedRows > 0) {
        return `Survey with ID ${surveyId} deleted successfully`;
    } else {
        throw new Error(`Survey with ID ${surveyId} not found`);
    }
}

const submitSurveyResults = async (surveyId, answers, userId) => {
    try {
        const promises = answers.map(answer => 
            surveysRepository.saveAnswer(surveyId, answer.answerId, userId)
        );
        await Promise.all(promises);
    } catch (error) {
        console.error('Error in submitSurveyResults service:', error);
        throw error;
    }
};

module.exports = {
    getAllSurveys,
    getSurveyById,
    addSurvey,
    updateSurvey,
    deleteSurvey,
    submitSurveyResults
};
