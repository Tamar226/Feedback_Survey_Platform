import React from 'react';
import './SurveyModal.css';
import { Button } from 'primereact/button';

import QuestionCard from './QuestionCard';

const SurveyModal = ({ survey, questions, onClose, onAnswerChange, selectedAnswers,handleSubmitAll }) => {
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
                 <Button label="Submit All Answers" icon="pi pi-check" onClick={handleSubmitAll} />
            </div>
           
        </div>
        
    );
};

export default SurveyModal;