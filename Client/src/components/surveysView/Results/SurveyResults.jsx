import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSurveyDetails } from '../../../Requests';

export default function SurveyResults() {
    const { surveyId } = useParams();
    const [survey, setSurvey] = useState({});
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const getSurveyDetails = async () => {
            try {
                const result = await fetchSurveyDetails(surveyId);

                console.log(result);
                console.log(result.questions[0]);
                console.log('result:', result);


                if ( result) {
                    setSurvey(result[0]);
                    setQuestions(result.questions[0]);

                } else {
                    console.error("Failed to fetch survey details");
                }
            } catch (error) {
                console.error("Error fetching survey details", error);
            }
        };
        if (surveyId) {
            getSurveyDetails();
        }
    }, []);
    // console.log(survey);
    console.log(questions);
    if (!survey) {
        return <div>Loading...</div>;
    }

    return (
        <div className="survey-results-container">
            <h2>Survey: {survey.surveyName}</h2>
            <div className="questions-list">
                {questions.map((question, index) => (
                    <div className="question-item" key={index}>
                        <h3>{question.question}</h3>
                        {/* Add logic to display answers */}
                    </div>
                ))}
            </div>
        </div>
    );
}
