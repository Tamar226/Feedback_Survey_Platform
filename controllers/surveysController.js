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
// const getAllSurveys = async (req, res) => {
//     try {
//         const surveys = await surveyService.getAllSurveys();
//         res.status(200).json(surveys);
//     } catch (error) {
//         console.error('Error fetching surveys:', error);
//         res.status(500).send('Internal Server Error');
//     }
// };

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
    const newSurvey = req.body; // קבלת האובייקט של הסקר מהבקשה

    try {
        // וידוא שהאובייקט מכיל את כל השדות הדרושים
        if (!newSurvey.managerId || !newSurvey.surveyName || typeof newSurvey.active !== 'number' || !Array.isArray(newSurvey.questions)) {
            return res.status(404).json({ error: 'Invalid survey data' });
        }

        for (const question of newSurvey.questions) {
            if (!question.question || !Array.isArray(question.answers)) {
                return res.status(404).json({ error: 'Invalid question data' });
            }

            for (const answer of question.answers) {
                if (!answer.answer || typeof answer.answerId !== 'number') {
                    return res.status(404).json({ error: 'Invalid answer data' });
                }
            }
        }

        // קריאה לפונקציה בשכבת השירות להוספת הסקר
        const insertedSurvey = await surveyService.addSurvey(newSurvey);

        return res.status(200).json(insertedSurvey); // החזרת הסקר החדש שנוסף בתגובה
    } catch (error) {
        console.error('Error adding survey:', error);
        return res.status(500).send('Internal Server Error');
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
