// src/components/SurveyDetail.jsx
import React, { useState, useEffect } from 'react';
import Question from './Question';
import { Button } from 'primereact/button';
import { fetchSurveyQuestions, submitSurveyAnswers } from '../Requests';

const SurveyDetail = ({ survey, onClose }) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const getQuestions = async () => {
            const data = await fetchSurveyQuestions(survey.id);
            setQuestions(data);
        };

        getQuestions();
    }, [survey.id]);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleSubmit = async () => {
        await submitSurveyAnswers(survey.id, answers);
        onClose();
    };

    return (
        <div className="survey-detail">
            <div className="p-card p-shadow-3 p-p-3 p-mt-5">
                <div className="p-d-flex p-jc-between p-ai-center">
                    <h3>{survey.surveyName}</h3>
                    <Button icon="pi pi-times" className="p-button-rounded p-button-danger" onClick={onClose} />
                </div>
                {questions.map((q) => (
                    <Question key={q.id} question={q} onAnswerChange={handleAnswerChange} />
                ))}
                <Button label="Submit" icon="pi pi-check" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default SurveyDetail;
