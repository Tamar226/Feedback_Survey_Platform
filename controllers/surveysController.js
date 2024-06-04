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
    const id = req.params.id;
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
        if (result.insertId > 0) {
            const insertSurvey = await surveyService.getSurveyById(result.insertId);
            res.status(200).send(insertSurvey.data);
        } else {
            res.status(404).send('Error adding survey');
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
        const result = await surveyService.updateSurvey(surveyId, updatedSurveyData);
        if (result.affectedRows > 0) {
            res.status(200).send(`Survey with ID ${surveyId} updated successfully`);
        } else {
            res.status(404).send(`Survey with ID ${surveyId} not found`);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const deleteSurvey = async (req, res) => {
    const surveyId = req.params.surveyId;
    try {
        const result = await surveyService.deleteSurvey(surveyId);
        if (result.affectedRows > 0) {
            res.status(200).send(`Survey with ID ${surveyId} deleted successfully`);
        } else {
            res.status(404).send(`Survey with ID ${surveyId} not found`);
        }
    } catch (error) {
        console.error('Error deleting survey:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getAllSurveys,
    getSurveyById,
    addSurvey,
    updateSurvey,
    deleteSurvey
};
