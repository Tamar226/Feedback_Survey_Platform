import React, { useState, useEffect } from 'react';
import Survey from '../Adding_surveys/Survey';
import SurveyCard from './SurveyCard';
import SurveyDetails from './SurveyDetails';
import { Button } from 'primereact/button';
import { fetchSurveys } from '../../Requests';

export default function SurveysPage() {
    const [surveys, setSurveys] = useState([]);
    const [showSurvey, setShowSurvey] = useState(false);
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    useEffect(() => {
        const getSurveys = async () => {
            try {
                const result = await fetchSurveys();
                if (result.status === 200 && result.data) {
                    setSurveys(result.data[1][0]);
                } else {
                    console.error("Failed to fetch surveys");
                }
            } catch (error) {
                console.error("Error fetching surveys", error);
            }
        };
        getSurveys();

    }, []);
    console.log(surveys)

    const handleAddSurvey = () => {
        setShowSurvey(true);
    };

    const handleCloseSurvey = () => {
        setShowSurvey(false);
    };

    const handleSelectSurvey = (survey) => {
        setSelectedSurvey(survey);
    };

    

    return (
        <>
            <h2>Active Surveys</h2>
            <div className="allSurveys">
                {surveys.map((survey) => (
                    <SurveyCard
                        key={survey.id}
                        survey={survey}
                        onSelect={() => handleSelectSurvey(survey)}
                    />
                ))}
            </div>
            {/* <div className="p-grid p-justify-center p-mt-5">
                <div className="p-col-12 p-md-8 p-lg-6">
                    <Button label="Add New Survey" icon="pi pi-plus" onClick={handleAddSurvey} />
                </div>
            </div> */}
            {/* {showSurvey && <Survey onClose={handleCloseSurvey} />} */}
           
        </>
    );
}
