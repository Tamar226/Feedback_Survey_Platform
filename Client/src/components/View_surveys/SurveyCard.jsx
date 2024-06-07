// src/components/SurveyCard.jsx
import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const SurveyCard = ({ survey, onSelect }) => {
    return (
        <Card title={survey.surveyName} subTitle={survey.active ? "Active" : "Inactive"}>
            <Button label="View Survey" icon="pi pi-eye" onClick={onSelect} />
        </Card>
    );
};

export default SurveyCard;
