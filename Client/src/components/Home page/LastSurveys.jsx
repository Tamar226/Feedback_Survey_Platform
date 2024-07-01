import React, { useState, useEffect } from 'react';
import SurveyCard from '../surveysView/SurveyCard';
import SurveyDetails from '../surveysView/SurveyDetails';
import { fetchSurveys } from '../../Requests';
// import './LastSurveys.css';

export default function LastSurveys() {
    const [surveys, setSurveys] = useState([]);
    const [selectedSurvey, setSelectedSurvey] = useState(null);

    useEffect(() => {
        const getSurveys = async () => {
            try {
                const result = await fetchSurveys();
                if (result.status === 200 && result.data) {
                    // Sort surveys by createdAt date in descending order and take the first 3
                    const sortedSurveys = result.data[1][0].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);
                    setSurveys(sortedSurveys);
                } else {
                    console.error("Failed to fetch surveys");
                }
            } catch (error) {
                console.error("Error fetching surveys", error);
            }
        };
        getSurveys();
    }, []);

    return (
        <div className="last-surveys-container"><br/>
            <h1>Last Created Surveys</h1><br/>
            <div className="last-surveys">
                {surveys.map((survey) => (
                    <div className="survey-item" key={survey.id}>
                        <SurveyCard
                            survey={survey}
                            onSelect={() => setSelectedSurvey(survey)}
                        />
                    </div>
                ))}
            </div>
            {selectedSurvey && (
                <SurveyDetails
                    survey={selectedSurvey}
                    onClose={() => setSelectedSurvey(null)}
                />
            )}
        </div>
    );
}
