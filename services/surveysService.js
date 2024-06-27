const surveysRepository = require('../repositories/surveysHandlerDB');
const answersRepository = require('../repositories/answersHandlerDB');
const questionsRepository = require('../repositories/questionsHandlerDB');
const answersService = require('./answersService');
const questionsService = require('./questionService');

async function getAllSurveys() {
    const result = await surveysRepository.getAllSurveys();
    if (result.hasError) {
        throw new Error('Error fetching surveys');
    }
    return result.data;
}

// const getAllSurveys = async () => {
//     const surveysResult = await surveysRepository.getAllSurveys();
//     if (surveysResult.hasError || !surveysResult.data) {
//         throw new Error('Error fetching surveys');
//     }

//     const questionsResult = await questionsService.getAllQuestions();
//     if (questionsResult.hasError ) {
//         throw new Error('Error fetching questions');
//     }

//     const answersResult = await answersService.getAllAnswers();
//     if (answersResult.hasError ) {
//         throw new Error('Error fetching answers');
//     }

//     console.log('Surveys:', surveysResult.data);
//     console.log('Questions:', questionsResult.data);
//     console.log('Answers:', answersResult.data);

//     const surveys = surveysResult.data || [];
//     const questions = questionsResult.data || [];
//     const answers = answersResult.data || [];

//     // Map answers to questions
//     const questionsWithAnswers = questions.map(question => {
//         question.answers = answers.filter(answer => answer.questionId === question.id);
//         return question;
//     });

//     // Map questions to surveys
//     const surveysWithQuestions = surveys.map(survey => {
//         survey.questions = questionsWithAnswers.filter(question => question.surveyId === survey.id);
//         return survey;
//     });

//     console.log('Surveys with Questions and Answers:', surveysWithQuestions);

//     return surveysWithQuestions;
// };


// const getSurveyById = async (surveyId) => {
//     const result = await surveysRepository.getSurveyById(surveyId);
//     if (result.hasError) {
//         throw new Error(`Survey with ID ${id} not found`);
//     }
//     return result.data;
// };

// const getSurveyById = async (surveyId) => {
//     const surveyResult = await surveysRepository.getSurveyById(surveyId);
//     if (surveyResult.hasError) {
//         throw new Error(`Survey with ID ${surveyId} not found`);
//     }

//     const questionsResult = await questionsRepository.getQuestionsBySurveyId(surveyId);
//     if (questionsResult.hasError) {
//         throw new Error(`Questions for survey with ID ${surveyId} not found`);
//     }

//     return {
//         survey: surveyResult.data,
//         questions: questionsResult.data,
//     };
// };
const getSurveyById = async (surveyId) => {
    const surveyResult = await surveysRepository.getSurveyById(surveyId);
    if (surveyResult.hasError) {
        throw new Error(`Survey with ID ${surveyId} not found`);
    }

    const questionsResult = await questionsRepository.getQuestionsBySurveyId(surveyId);
    if (questionsResult.hasError) {
        throw new Error(`Questions for survey with ID ${surveyId} not found`);
    }

    return {
        ...surveyResult.data,
        questions: questionsResult.data,
    };
};
async function getSurveysBySearch(searchText) {
    try {
        const result = await surveysRepository.getSurveysBySearch(searchText);

        if (result.hasError) {
            throw new Error(`Failed to fetch surveys by search: ${result.data}`);
        }
        return result.data;
    } catch (error) {
        throw error;
    }
}


const addSurvey = async (newSurvey) => {
    try {
        const result = await surveysRepository.addSurvey(newSurvey);

        if (!result || !result.insertId) {
            throw new Error('Failed to insert survey');
        }

        const surveyId = result.insertId;
        const insertSurvey = await surveysRepository.getSurveyById(surveyId);
        if (!insertSurvey) {
            throw new Error('Failed to retrieve inserted survey');
        }

        // הוספת שאלות לסקר
        for (const question of newSurvey.questions) {
            question.surveyID = surveyId;
            const insertedQuestion = await questionsService.addQuestion(question);
            console.log(insertedQuestion);

            if (!insertedQuestion || insertedQuestion.length === 0) {
                throw new Error('Error adding question to survey');
            }

            const questionId = insertedQuestion[0].id;
            console.log(questionId);
            // הוספת תשובות לשאלה
            for (const answer of question.answers) {
                answer.questionId = questionId;
                const insertedAnswer = await answersService.addAnswer(answer);
                if (!insertedAnswer || !insertedAnswer.length===0) {
                    throw new Error('Failed to insert answer');
                }
            }
        }
        return insertSurvey.data;
    } catch (error) {
        console.error('Error adding survey:', error);
        throw error;
    }
};

async function updateSurvey(surveyId, updatedSurveyData) {
    const result = await surveysRepository.updateSurvey(surveyId, updatedSurveyData);
    if (result.affectedRows > 0) {
        return `Survey with ID ${surveyId} updated successfully`;
    } else {
        throw new Error(`Survey with ID ${surveyId} not found`);
    }
}

const deleteSurvey = async (surveyId) => {
    try {
        // Fetch all questions related to the survey
        const questionsResult = await questionsRepository.getQuestionsBySurveyId(surveyId);
        const questions = questionsResult.data;

        // Delete all answers related to the questions
        for (let question of questions) {
            await answersRepository.deleteAnswersByQuestionId(question.id);
        }

        // Delete all questions related to the survey
        await questionsRepository.deleteQuestionsBySurveyId(surveyId);

        // Delete the survey itself
        const surveyDeleteResult = await surveysRepository.deleteSurveyById(surveyId);
        if (surveyDeleteResult.hasError) {
            throw new Error(`Error deleting survey with id ${surveyId}`);
        }

        return `Survey with id ${surveyId} and all related questions and answers were deleted successfully.`;
    } catch (error) {
        throw new Error(`Error deleting survey with id ${surveyId}: ${error.message}`);
    }
};


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

const getSurveyResults = async (surveyId) => {
    const result = await surveysRepository.getSurveyResults(surveyId);

    if (result.hasError) {
        throw new Error('Error fetching survey results');
    }

    const formattedResults = {};
    result.data.forEach(resultItem => {
        if (!formattedResults[resultItem.questionId]) {
            formattedResults[resultItem.questionId] = {
                question: resultItem.question,
                answers: []
            };
        }
        formattedResults[resultItem.questionId].answers.push({
            answerId: resultItem.answerId,
            answer: resultItem.answer,
            count: resultItem.count
        });
    });

    return {
        surveyName: result.data[0].surveyName,
        questions: formattedResults,
    };
};




module.exports = {
    getAllSurveys,
    getSurveyById,
    getSurveysBySearch,
    addSurvey,
    updateSurvey,
    deleteSurvey,
    submitSurveyResults,
    getSurveyResults
};
