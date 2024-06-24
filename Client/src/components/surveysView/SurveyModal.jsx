import React from 'react';
import './SurveyModal.css';
import QuestionCard from './QuestionCard';

const SurveyModal = ({ survey, questions, onClose, onAnswerChange, selectedAnswers }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{survey.surveyName}</h3>
                    <button className="close-button" onClick={onClose}>✖</button>
                </div>
                {questions.map((q) => (
                    <QuestionCard
                        key={q.id}
                        question={q}
                        onAnswerChange={onAnswerChange}
                        selectedAnswer={selectedAnswers[q.id]}
                    />
                ))}
            </div>
        </div>
    );
};

export default SurveyModal;
