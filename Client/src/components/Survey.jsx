// src/components/Survey.jsx
import React, { useState, useEffect } from 'react';
import 'primeicons/primeicons.css';
import { PrimeIcons } from 'primereact/api';
import SurveyQuestion from './Question';
import { fetchSurveys, addSurvey } from '../Requests';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import '../components/Styles/AddQuestion.css';

const Survey = ({ onClose }) => {
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
        <div className="survey-container">
            <div className="survey-card">
                <div className="survey-header">
                    <h3>Survey Questions</h3>
                    <Button icon="pi pi-times-circle"  onClick={onClose} />
                </div>
                <SurveyQuestion onAddQuestion={handleAddQuestion} />
                {questions.map((q, index) => (
                    <div key={index} className="survey-question">
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
    );
};

export default Survey;
