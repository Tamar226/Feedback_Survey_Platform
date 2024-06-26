// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchSurveyDetails } from '../../../Requests';
// import './SurveyResultStyle.css'
// export default function SurveyResults() {
//     const { surveyId } = useParams();
//     const [survey, setSurvey] = useState({});
//     const [questions, setQuestions] = useState([]);

//     useEffect(() => {
//         const getSurveyDetails = async () => {
//             try {
//                 const result = await fetchSurveyDetails(surveyId);
//                 if ( result) {
//                     setSurvey(result[0]);
//                     setQuestions(result.questions[0]);

//                 } else {
//                     console.error("Failed to fetch survey details");
//                 }
//             } catch (error) {
//                 console.error("Error fetching survey details", error);
//             }
//         };
//         if (surveyId) {
//             getSurveyDetails();
//         }
//     }, []);
//     if (!survey) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="survey-results-container">
//             <h2>Survey: {survey.surveyName}</h2>
//             <div className="questions-list">
//                 {questions.map((question, index) => (
//                     <div className="question-item" key={index}>
//                         <h3>{question.question}</h3>
//                         {/* Add logic to display answers */}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSurveyResults } from '../../../Requests'; 
// import { Pie } from 'react-chartjs-2';

const SurveyResults = () => {
    const { surveyId } = useParams();
    const [results, setResults] = useState({});

    useEffect(() => {
        const getResults = async () => {
            try {
                const response = await fetchSurveyResults(surveyId);
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching survey results:', error);
            }
        };

        if (surveyId) {
            getResults();
        }
    }, [surveyId]);

    return (
        <div className="survey-results-container">
            {Object.keys(results).map(questionId => (
                <div key={questionId}>
                    <h3>Question {questionId}</h3>
                    <Pie 
                        data={{
                            labels: results[questionId].labels,
                            datasets: [{
                                data: results[questionId].data,
                                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                            }]
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default SurveyResults;
