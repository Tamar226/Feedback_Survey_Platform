const surveyService = require('../services/surveysService');

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
    const id = req.params.surveyId;
    try {
        const Survey = await surveyService.getSurveyById(id);
        res.status(200).send(Survey);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const addSurvey = async (req, res) => {
    const newSurvey = req.body;
    try {
        const result = await surveyService.addSurvey(newSurvey);
        if (result.length > 0 && result[0].id > 0) {
            const insertSurvey = await surveyService.getSurveyById(result[0].id);
            res.status(200).send(insertSurvey);
        } else {
            res.status(404).json('Error adding survey');
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
        const updateMessage = await surveyService.updateSurvey(surveyId, updatedSurveyData);
        res.status(200).send(updateMessage);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const deleteSurvey = async (req, res) => {
    const surveyId = req.params.surveyId;
    try {
        const deleteMessage = await surveyService.deleteSurvey(surveyId);
        res.status(200).send(deleteMessage);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const submitSurveyResults = async (req, res) => {
    try {
        const { surveyId } = req.params;
        const { answers, userId } = req.body;

        if (!answers || !surveyId || !userId) {
            return res.status(400).send('Missing data');
        }

        await surveyService.submitSurveyResults(surveyId, answers, userId);
        res.status(201).send('Answers submitted successfully');
    } catch (error) {
        console.error('Error submitting survey answers:', error);
        res.status(500).send('Internal server error');
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
