// // src/components/SurveysPage.jsx
// import React, { useState } from 'react';
// import Survey from './Survey';
// import { Button } from 'primereact/button';

// export default function SurveysPage() {
//     const [survey,setSurvey]=useState({});
//     const [showSurvey, setShowSurvey] = useState(false);

//     const handleAddSurvey = () => {
//         setShowSurvey(true);
//     };
//     const handleCloseSurvey = () => {
//         setShowSurvey(false);
//     };

//     return (
//         <>
//         <h2>Active Surveys</h2>
//         <div className="allSUrveys">
//             {survey.title};
//         </div>
//             <div className="p-grid p-justify-center p-mt-5">
//                 <div className="p-col-12 p-md-8 p-lg-6">
//                     <Button label="Add New Survey" icon="pi pi-plus" onClick={handleAddSurvey} />
//                 </div>
//             </div>
//             {showSurvey && <Survey onClose={handleCloseSurvey} />}
//         </>
//     );
// }

// src/components/SurveysPage.jsx
import React, { useState, useEffect } from 'react';
import Survey from './Survey';
import SurveyCard from './SurveyCard';
import SurveyDetail from './SurveyDetails';
import { Button } from 'primereact/button';
import { fetchSurveys } from '../Requests';

export default function SurveysPage() {
    const [surveys, setSurveys] = useState([]);
    const [showSurvey, setShowSurvey] = useState(false);
    const [selectedSurvey, setSelectedSurvey] = useState(null);

    useEffect(() => {
        const getSurveys = async () => {
            const data = await fetchSurveys();
            setSurveys(data);
        };

        getSurveys();
    }, []);

    const handleAddSurvey = () => {
        setShowSurvey(true);
    };

    const handleCloseSurvey = () => {
        setShowSurvey(false);
    };

    const handleSelectSurvey = (survey) => {
        setSelectedSurvey(survey);
    };

    const handleCloseSurveyDetail = () => {
        setSelectedSurvey(null);
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
            <div className="p-grid p-justify-center p-mt-5">
                <div className="p-col-12 p-md-8 p-lg-6">
                    <Button label="Add New Survey" icon="pi pi-plus" onClick={handleAddSurvey} />
                </div>
            </div>
            {showSurvey && <Survey onClose={handleCloseSurvey} />}
            {selectedSurvey && (
                <SurveyDetail survey={selectedSurvey} onClose={handleCloseSurveyDetail} />
            )}
        </>
    );
}
