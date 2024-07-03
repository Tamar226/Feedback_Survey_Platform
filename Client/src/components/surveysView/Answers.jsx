import React from 'react';

const Answers = ({ answers, questionId, onAnswerChange, selectedAnswer }) => {
    return (
        <div>
            {answers.map(answer => (
                <div className='cardAnswers' key={answer.id}>
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

