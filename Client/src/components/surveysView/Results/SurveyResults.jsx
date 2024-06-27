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
import { Chart } from 'primereact/chart';
import './SurveyResultStyle.css';

const SurveyResults = () => {
    const { surveyId } = useParams();
    const [results, setResults] = useState({});
    const [surveyName, setSurveyName] = useState('');

    useEffect(() => {
        const getResults = async () => {
            try {
                const response = await fetchSurveyResults(surveyId);
                console.log('res-client:',response)
                setResults(response);
                // setSurveyName(response.data.surveyName || 'Survey Results');
            } catch (error) {
                console.error('Error fetching survey results:', error);
            }
        };

        if (surveyId) {
            getResults();
        }
    }, [surveyId]);

    const renderChart = (questionId, answers) => {
        const labels = answers.map(answer => answer.answer);
        const data = answers.map(answer => answer.count);

        const pieData = {
            labels,
            datasets: [{
                data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40']
            }]
        };

        const barData = {
            labels,
            datasets: [{
                label: 'Responses',
                data,
                backgroundColor: '#42A5F5'
            }]
        };

        return questionId % 2 === 0 ? (
            <Chart type="bar" data={barData} />
        ) : (
            <Chart type="pie" data={pieData} />
        );
    };

    return (
        <div className="survey-results-container">
            <h2>{surveyName}</h2>
            {Object.keys(results).map(questionId => (
                <div key={questionId} className="question-section">
                    <h3>{results[questionId].question}</h3>
                    {renderChart(questionId, results[questionId].answers)}
                </div>
            ))}
        </div>
    );
};

export default SurveyResults;
