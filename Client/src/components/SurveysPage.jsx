// src/components/SurveysPage.jsx
import React, { useState } from 'react';
import Survey from './Survey';
import { Button } from 'primereact/button';

export default function SurveysPage() {
    const [showSurvey, setShowSurvey] = useState(false);

    const handleAddSurvey = () => {
        setShowSurvey(true);
    };
    const handleCloseSurvey = () => {
        setShowSurvey(false);
    };

    return (
        <>
        <h2>Active Surveys</h2>
            <div className="p-grid p-justify-center p-mt-5">
                <div className="p-col-12 p-md-8 p-lg-6">
                    <Button label="Add New Survey" icon="pi pi-plus" onClick={handleAddSurvey} />
                </div>
            </div>
            {showSurvey && <Survey onClose={handleCloseSurvey} />}
        </>
    );
}
