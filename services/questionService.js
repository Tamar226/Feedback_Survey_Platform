const questionsRepository = require('../repositories/questionsHandlerDB');

async function getAllQuestions() {
    const result = await questionsRepository.getAllQuestions();
    if (result.hasError) {
        throw new Error('Error fetching questions');
    }
    return result.data;
}

const getQuestionById = async (questionId) => {
    const result = await questionsRepository.getQuestionById(questionId);
    if (result.hasError) {
        throw new Error(`Question with ID ${id} not found`);
    }
    return result.data;
};

const getQuestionsBySurveyId = async (surveyId) => {
    const result = await questionsRepository.getQuestionsBySurveyId(surveyId);
    if (result.hasError) {
        throw new Error(`Question with survet id ${id} not found`);
    }
    return result.data;
};

// const addQuestion = async (newQuestion) => {
//     const result = await questionsRepository.addQuestion(newQuestion);
//     if (result.insertId > 0) {
//         const insertQuestion = await questionsRepository.getQuestionById(result.insertId);
//         return insertQuestion.data;
//     }
// }
const addQuestion = async (newQuestion) => {
    const result = await questionsRepository.addQuestion(newQuestion);
    if (result.insertId > 0) {
        const insertQuestion = await questionsRepository.getQuestionById(result.insertId);
        return insertQuestion.data; // כאן אנחנו מחזירים את הנתונים של השאלה שנוצרה
    } else {
        throw new Error('Error inserting question');
    }
}
async function updateQuestion(questionId, updatedQuestionData) {
    const result = await questionsRepository.updateQuestion(questionId, updatedQuestionData);
    if (result.affectedRows > 0) {
        return `Question with ID ${questionId} updated successfully`;
    } else {
        throw new Error(`Question with ID ${questionId} not found`);
    }
}

async function deleteQuestion(questionId) {
    const result = await questionsRepository.deleteQuestion(questionId);
    if (result.affectedRows > 0) {
        return `Question with ID ${questionId} deleted successfully`;
    } else {
        throw new Error(`Question with ID ${questionId} not found`);
    }
}

module.exports = {
    getAllQuestions,
    getQuestionById,
    getQuestionsBySurveyId,
    addQuestion,
    updateQuestion,
    deleteQuestion
};
