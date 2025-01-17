const surveyService = require('../services/surveysService');
const questionsService = require('../services/questionService');
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
        const surveyData = await surveyService.getSurveyById(id);
        res.status(200).send(surveyData);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
};

const addSurvey = async (req, res) => {
    const userRole = req.userRole;

    if (userRole !== 'reviewer' && userRole !== 'manager') {
        return res.status(403).json({ error: 'Forbidden: Only reviewers and managers can add surveys' });
    }
    
    const newSurvey = req.body; // קבלת האובייקט של הסקר מהבקשה

    try {
        // וידוא שהאובייקט מכיל את כל השדות הדרושים והספציפיים
        if (!newSurvey.userId || !newSurvey.surveyName || typeof newSurvey.active !== 'number' || !Array.isArray(newSurvey.questions) || !newSurvey.category) {
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

        return res.status(201).json(insertedSurvey);
    } catch (error) {
        console.error('Error adding survey:', error);
        return res.status(500).send('Internal Server Error');
    }
};


const updateSurvey = async (req, res) => {
    const surveyId = req.params.surveyId;
    const updatedSurveyData = req.body;
    try {
        const updateSurvey = await surveyService.updateSurvey(surveyId, updatedSurveyData);
        res.status(200).send(updateSurvey);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const deleteSurvey = async (req, res) => {
    const userRole = req.userRole;
    if (userRole !== 'manger' && userRole !== 'reviewer') {
        return res.status(403).json({ error: 'Forbidden: Only managers and reviewers can delete surveys' });
    }
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

const getSurveyResults = async (req, res) => {
    try {
        const { surveyId } = req.params;
        const surveyResults = await surveyService.getSurveyResults(surveyId);

        if (!surveyResults || !surveyResults.questions || Object.keys(surveyResults.questions).length === 0) {
            return res.status(200).json({ surveyId, questions: [], userIds: [] });
        }

        res.status(200).json(surveyResults);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllSurveys,
    getSurveyById,
    addSurvey,
    updateSurvey,
    deleteSurvey,
    submitSurveyResults,
    getSurveyResults
};
