import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import SurveyDetails from './SurveyDetails';

const SurveyCard = ({ survey }) => {
    const [selectedSurvey, setSelectedSurvey] = useState(null);

    const handleViewSurvey = () => {
        setSelectedSurvey(survey);
    };

    const handleCloseSurveyDetail = () => {
        setSelectedSurvey(null);
    };

    return (
        <Card title={survey.surveyName} subTitle={survey.active ? "Active" : "Inactive"}>
            <Button label="View Survey" icon="pi pi-eye" onClick={handleViewSurvey} />
            {selectedSurvey && (
                <SurveyDetails survey={selectedSurvey} onClose={handleCloseSurveyDetail} />
            )}
             
        </Card>
    );
};

export default SurveyCard;
