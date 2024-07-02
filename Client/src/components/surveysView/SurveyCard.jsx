import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { useNavigate } from 'react-router-dom';
import SurveyDetails from './SurveyDetails';

const SurveyCard = ({ survey }) => {
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const navigate = useNavigate();

    const handleViewSurvey = () => {

        setSelectedSurvey(survey);
    };

    const handleCloseSurveyDetail = () => {
        setSelectedSurvey(null);
    };

    const handleViewSurveyResults = () => {
        navigate(`/surveys/${survey.id}/results`);
    };

    return (
        <Card className='surveyCard' title={survey.surveyName} subTitle={survey.active ? "Active" : "Inactive"}>
            <div className='SurveysButtonsContainer'>
                <Button
                    className='viewSurveyButton'
                    icon="pi pi-eye"
                    rounded outlined severity="info"
                    aria-label="viewSurvey"
                    onClick={handleViewSurvey} 
                    disabled={!survey.active} />
                <Button
                    className="viewSurveyResultsButton"
                    icon="pi pi-chart-line"
                    rounded outlined severity="info"
                    aria-label="viewSurveyResults"
                    onClick={handleViewSurveyResults}/>
            </div>
            {selectedSurvey && (
                <SurveyDetails survey={selectedSurvey} onClose={handleCloseSurveyDetail} />
            )}
        </Card>
    );
};

export default SurveyCard;

