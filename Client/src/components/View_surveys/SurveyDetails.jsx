// import React, { useState, useEffect } from 'react';
// import Answers from './Answers';
// import { Button } from 'primereact/button';
// import { fetchSurveyQuestions, submitSurveyAnswers } from '../../Requests';
// import QuestionCard from './QuestionCard';

// const SurveyDetail = ({ survey, onClose }) => {
//     const [questions, setQuestions] = useState([]);
//     const [answers, setAnswers] = useState({});

//     useEffect(() => {
//         const getQuestions = async () => {
//             try {
//                 const result = await fetchSurveyQuestions(survey.id);
//                 if (result.status === 200 && result.data) {
//                     setQuestions(result.data);
//                 } else {
//                     console.error("Failed to fetch surveys");
//                 }
//             } catch (error) {
//                 console.error('Error fetching questions:', error);
//             }
//         };
        
//         if (survey) {
//             getQuestions();
//         }
//     }, [survey]);
// console.log(questions);
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
//         <div className="survey-detail">
//             <div className="p-card p-shadow-3 p-p-3 p-mt-5">
//                 <div className="p-d-flex p-jc-between p-ai-center">
//                     <h3>{survey.surveyName}</h3>
//                     <Button icon="pi pi-times" className="p-button-rounded p-button-danger" onClick={onClose} />
//                 </div>
//                 {questions.map((q) => (
//                     <QuestionCard key={q.id} question={q} onAnswerChange={handleAnswerChange} />,
//                     <Answers key={q.id} question={q}/>
//                 ))}
                
//                 <Button label="Answer this survey" icon="pi pi-reply"  />
//                 {/* <Button label="Submit" icon="pi pi-check" onClick={handleSubmit} /> */}
//             </div>
//         </div>
//     );
// };

// export default SurveyDetail;

import React, { useState, useEffect } from 'react';
import Answers from './Answers';
import { Button } from 'primereact/button';
import { fetchSurveyQuestions, fetchSurveyAnswers, submitSurveyAnswers } from '../../Requests';
import QuestionCard from './QuestionCard';

const SurveyDetail = ({ survey, onClose }) => {
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

        const getAnswers = async () => {
            try {
                const result = await fetchSurveyAnswers(survey.id);
                if (result.status === 200 && result.data) {
                    setAnswers(result.data);
                } else {
                    console.error("Failed to fetch answers");
                }
            } catch (error) {
                console.error('Error fetching answers:', error);
            }
        };

        if (survey) {
            getQuestions();
            getAnswers();
        }
    }, [survey]);
 console.log(answers)
    const handleAnswerChange = (questionId, answer) => {
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [questionId]: answer,
        }));
    };

    const handleSubmit = async () => {
        await submitSurveyAnswers(survey.id, selectedAnswers);
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
                    <div key={q.id}>
                        <QuestionCard question={q} onAnswerChange={handleAnswerChange} />
                        <Answers questionId={q.id} answers={answers} onAnswerChange={handleAnswerChange} />
                    </div>
                ))}
                <Button label="Submit" icon="pi pi-check" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default SurveyDetail;
