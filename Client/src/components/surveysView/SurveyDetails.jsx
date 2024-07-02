import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { fetchSurveyQuestions, fetchSurveyAnswers, submitSurveyResults } from '../../Requests';
import SurveyModal from './SurveyModal';

const SurveyDetails = ({ survey, onClose, userId }) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const result = await fetchSurveyQuestions(survey.id);
                if (result.status === 200 && result.data) {
                    setQuestions(result.data[0]);
                    const allAnswers = {};
                    for (const question of result.data[0]) {
                        const answerResult = await fetchSurveyAnswers(question.id);
                        if (answerResult.status === 200 && answerResult.data) {
                            allAnswers[question.id] = answerResult.data;
                        }
                    }
                    setAnswers(allAnswers);
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
            console.log(selectedAnswers);
            const formattedAnswers = Object.entries(selectedAnswers).map(([questionId, answer]) => {
                const questionAnswers = answers[questionId];
                const answerObject = questionAnswers.find(a => a.answer === answer);
                if (!answerObject) {
                    throw new Error(`Answer not found for questionId: ${questionId} and answer: ${answer}`);
                }
                return {
                    answerId: answerObject.id,
                };
            });
            console.log(formattedAnswers);
            const result = await submitSurveyResults(survey.id, formattedAnswers, 1);
            if (result.success) {
                console.log(result.message);
                onClose();
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error submitting answers:', error);
        }
    };

    return (
        <div className="survey-detail">
            <div className="p-card p-shadow-3 p-p-3 p-mt-5">
                {questions.length > 0 && (
                    <SurveyModal
                        survey={survey}
                        questions={questions}
                        onClose={onClose}
                        onAnswerChange={handleAnswerChange}
                        selectedAnswers={selectedAnswers}
                        handleSubmitAll={handleSubmitAll}
                    />
                )}
            </div>
        </div>
    );
};

export default SurveyDetails;
