import React from 'react';

const Answers = ({ answers, questionId, onAnswerChange, selectedAnswer }) => {
    return (
        <div>
            {answers
                .filter(answer => answer.questionId === questionId)
                .map(answer => (
                    <div key={answer.id}>
                        <input
                            type="radio"
                            name={`question-${questionId}`}
                            value={answer.answer}
                            checked={selectedAnswer === answer.answer}
                            onChange={(e) => onAnswerChange(questionId, e.target.value)}
                        />
                        {answer.answer}
                    </div>
                ))}
        </div>
    );
};

export default Answers;
