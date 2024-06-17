// import React, { useState, useEffect } from 'react';
// import Survey from '../Adding_surveys/AddSurvey';
// import SurveyCard from './SurveyCard';
// import SurveyDetails from './SurveyDetails';
// import AddSurvey from '../Adding_surveys/AddSurvey';
// import { Button } from 'primereact/button';
// import { fetchSurveys } from '../../Requests';

// export default function SurveysPage() {
//     const [surveys, setSurveys] = useState([]);
//     const [showAddSurvey, setShowAddSurvey] = useState(false);
//     const [selectedSurvey, setSelectedSurvey] = useState(null);
//     useEffect(() => {
//         const getSurveys = async () => {
//             try {
//                 const result = await fetchSurveys();
//                 if (result.status === 200 && result.data) {
//                     setSurveys(result.data[1][0]);
//                 } else {
//                     console.error("Failed to fetch surveys");
//                 }
//             } catch (error) {
//                 console.error("Error fetching surveys", error);
//             }
//         };
//         getSurveys();

//     }, []);
//     const handleAddSurvey = () => {
//         setShowAddSurvey(true);
//     };

//     const handleCloseAddSurvey = () => {
//         setShowAddSurvey(false);
//     };


//     const handleSelectSurvey = (survey) => {
//         setSelectedSurvey(survey);
//     };

//     return (
//         <>
//             <h2>Active Surveys</h2>
//             <div className="allSurveys">
//                 {surveys.map((survey) => (
//                     <SurveyCard
//                         key={survey.id}
//                         survey={survey}
//                         onSelect={() => handleSelectSurvey(survey)}
//                     />
//                 ))}
//                 <Button label="Add New Survey" icon="pi pi-plus" onClick={handleAddSurvey} className="p-mt-3" />
//                 {showAddSurvey && (
//                     <div className="p-mt-4">
//                         <AddSurvey />
//                         <Button label="Close" icon="pi pi-times" onClick={handleCloseAddSurvey} className="p-ml-2" />
//                     </div>
//                 )}

//             </div>
//         </>
//     );
// }
import React, { useState, useEffect } from 'react';
import SurveyCard from './SurveyCard';
import AddSurvey from '../Adding_surveys/AddSurvey';
import { Button } from 'primereact/button';
import { fetchSurveys } from '../../Requests';

export default function SurveysPage() {
    const [surveys, setSurveys] = useState([]);
    const [showAddSurvey, setShowAddSurvey] = useState(false);
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

    const handleAddSurvey = () => {
        setShowAddSurvey(true);
    };

    const handleCloseAddSurvey = () => {
        setShowAddSurvey(false);
    };

    const handleSurveyAdded = (newSurvey) => {
        setSurveys([...surveys, newSurvey]);
        setShowAddSurvey(false); // Close the AddSurvey component after adding the survey
    };

    return (
        <>
            <h2>Active Surveys</h2>
            <div className="allSurveys">
                {surveys.map((survey) => (
                    <SurveyCard
                        key={survey.id}
                        survey={survey}
                        onSelect={() => setSelectedSurvey(survey)}
                    />
                ))}
                <Button label="Add New Survey" icon="pi pi-plus" onClick={handleAddSurvey} className="p-mt-3" />
                {showAddSurvey && (
                    <div className="p-mt-4">
                        <AddSurvey onClose={handleCloseAddSurvey} onSurveyAdded={handleSurveyAdded} />
                        <Button label="Close" icon="pi pi-times" onClick={handleCloseAddSurvey} className="p-ml-2" />
                    </div>
                )}
            </div>
        </>
    );
}
