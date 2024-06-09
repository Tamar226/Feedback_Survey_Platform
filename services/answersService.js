const answersRepository = require('../repositories/answersHandlerDB');

async function getAllAnswers() {
    const result = await answersRepository.getAllAnswers();
    if (result.hasError) {
        throw new Error('Error fetching answers');
    }
    return result.data;
}

const getAnswerById = async (answerId) => {
    const result = await answersRepository.getAnswerById(answerId);
    if (result.hasError) {
        throw new Error(`Answer with ID ${id} not found`);
    }
    return result.data;
};

const getAnswersByQuestionId = async (answerId) => {
    const result = await answersRepository.getAnswersByQuestionId(answerId);
    if (result.hasError) {
        throw new Error(`Answer with survet id ${id} not found`);
    }
    return result.data;
};

const addAnswer = async (newAnswer) => {
    const result = await answersRepository.addAnswer(newAnswer);
    if (result.insertId > 0) {
        const insertAnswer = await answersRepository.getAnswerById(result.insertId);
        return insertAnswer.data;
    }
}

async function updateAnswer(answerId, updatedAnswerData) {
    const result = await answersRepository.updateAnswer(answerId, updatedAnswerData);
    if (result.affectedRows > 0) {
        return `Answer with ID ${answerId} updated successfully`;
    } else {
        throw new Error(`Answer with ID ${answerId} not found`);
    }
}

async function deleteAnswer(answerId) {
    const result = await answersRepository.deleteAnswer(answerId);
    if (result.affectedRows > 0) {
        return `Answer with ID ${answerId} deleted successfully`;
    } else {
        throw new Error(`Answer with ID ${answerId} not found`);
    }
}

module.exports = {
    getAllAnswers,
    getAnswerById,
    getAnswersByQuestionId,
    addAnswer,
    updateAnswer,
    deleteAnswer
};
