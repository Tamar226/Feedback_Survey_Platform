import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { fetchSurveyQuestions, submitSurveyResults } from '../../Requests';
import QuestionCard from './QuestionCard';

const SurveyDetails = ({ survey, onClose, userId }) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const result = await fetchSurveyQuestions(survey.id);
                if (result.status === 200 && result.data) {
                    setQuestions(result.data);
                } else {
                    console.error("Failed to fetch surveys");
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        if (survey) {
            getQuestions();
        }
    }, [survey]);

    const handleAnswerChange = (questionId, answer) => {
        setSelectedAnswers(prevSelectedAnswers => ({
            ...prevSelectedAnswers,
            [questionId]: answer,
        }));
    };

    const handleSubmitAll = async () => {
        try {
            const formattedAnswers = Object.entries(selectedAnswers).map(([questionId, answer]) => {
                const answerObject = answers.find(a => a.answer === answer && a.questionId === parseInt(questionId, 10));
                if (!answerObject) {
                    throw new Error(`Answer not found for questionId: ${questionId} and answer: ${answer}`);
                }
                return {
                    questionId: parseInt(questionId, 10),
                    answerId: answerObject.id,
                };
            });

            await submitSurveyResults(survey.id, formattedAnswers, userId);
            console.log('Answers submitted successfully');
            onClose();
        } catch (error) {
            console.error('Error submitting answers:', error);
        }
    };

    return (
        <div className="survey-detail">
            <div className="p-card p-shadow-3 p-p-3 p-mt-5">
                <div className="p-d-flex p-jc-between p-ai-center">
                    <h3>{survey.surveyName}</h3>
                    <Button icon="pi pi-times" className="p-button-rounded p-button-danger" onClick={onClose} />
                </div>
                {questions.map((q) => (
                    <div key={q.id}>
                        <QuestionCard 
                            question={q} 
                            onAnswerChange={handleAnswerChange} 
                            selectedAnswer={selectedAnswers[q.id]} 
                        />
                    </div>
                ))}
                <Button label="Submit All Answers" icon="pi pi-check" onClick={handleSubmitAll} />
            </div>
        </div>
    );
};

export default SurveyDetails;
