// import React, { useState, useEffect } from 'react';
// import Question from '../Adding_surveys/Question';
// import { Button } from 'primereact/button';
// import { fetchSurveyAnswers, submitSurveyAnswers } from '../../Requests';
// import QuestionCard from './QuestionCard';

// const SurveyDetail = ({ question, onClose }) => {
//     const [questions, setQuestions] = useState([]);
//     const [answers, setAnswers] = useState({});

//     useEffect(() => {
//         const getAnswers = async () => {
//             try {
//                 const result = await fetchSurveyAnswers(question.id);
//                 if (result.status === 200 && result.data) {
//                     setAnswers(result.data);
//                 } else {
//                     console.error("Failed to fetch answers for question " + question.id);
//                 }
//             } catch (error) {
//                 console.error('Error fetching answers:', error);
//             }
//         };
        
//         if (question) {
//             getAnswers();
//         }
//     }, [question]);
// console.log(answers);
//     const handleAnswerChange = (questionId, answer) => {
//         setAnswers((prevAnswers) => ({
//             ...prevAnswers,
//             [questionId]: answer,
//         }));
//     };

//     const handleSubmit = async () => {
//         await submitSurveyAnswers(survey.id, answers);
//         onClose();
//     };

//     return (
//         <>
//         </>
//     );
// };

// export default SurveyDetail;


import React from 'react';

const Answers = ({ answers, questionId, onAnswerChange }) => {
    return (
        <div>
            {answers
                .filter(answer => answer.questionId === questionId)
                .map(answer => (
                    <div key={answer.id}>
                        <input
                            type="checkbox"
                            value={answer.answer}
                            onChange={(e) => onAnswerChange(questionId, e.target.value)}
                        />
                        {answer.answer}
                    </div>
                ))}
        </div>
    );
};

export default Answers;
