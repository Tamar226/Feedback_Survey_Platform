// src/components/Survey.jsx

import React, { useState, useEffect } from 'react';
import SurveyQuestion from './Question';
import { fetchSurveys, addSurvey } from '../Requests';
import { Divider } from 'primereact/divider';

const Survey = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSurveys();
                setQuestions(data);
            } catch (error) {
                console.error('Error fetching surveys:', error);
            }
        };

        fetchData();
    }, []);

    const handleAddQuestion = async (question) => {
        try {
            const newQuestion = await addSurvey(question);
            setQuestions([...questions, newQuestion]);
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    return (
        <div className="p-grid p-justify-center p-mt-5">
            <div className="p-col-12 p-md-8 p-lg-6">
                <SurveyQuestion onAddQuestion={handleAddQuestion} />
                <div className="p-card p-shadow-3 p-p-3 p-mt-5">
                    <h3>Survey Questions</h3>
                    {questions.map((q, index) => (
                        <div key={index} className="p-mb-3">
                            <h4>{q.question}</h4>
                            <ul>
                                {q.options.map((option, i) => (
                                    <li key={i}>{option}</li>
                                ))}
                            </ul>
                            <Divider />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Survey;
