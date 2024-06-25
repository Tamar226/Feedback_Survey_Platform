// import React, { useState, useEffect } from 'react';
// import SurveyCard from './SurveyCard';
// import AddSurvey from '../surveysAdding/AddSurvey';
// import { Button } from 'primereact/button';
// import { fetchSurveys } from '../../Requests';
// import './SurveysPage.css'; 
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

//     const handleSurveyAdded = (newSurvey) => {
//         setSurveys([...surveys, newSurvey]);
//         setShowAddSurvey(false); // Close the AddSurvey component after adding the survey
//     };

//     return (
//         <>
//             <h2>Active Surveys</h2>
//             <div className="allSurveys">
//                 {surveys.map((survey) => (
//                     <SurveyCard
//                         key={survey.id}
//                         survey={survey}
//                         onSelect={() => setSelectedSurvey(survey)}
//                     />
//                 ))}
//                 <Button label="Add New Survey" icon="pi pi-plus" onClick={handleAddSurvey} className="p-mt-3" />
//                 {showAddSurvey && (
//                     <div className="p-mt-4">
//                         <AddSurvey onClose={handleCloseAddSurvey} onSurveyAdded={handleSurveyAdded} />
//                         <Button label="Close" icon="pi pi-times" onClick={handleCloseAddSurvey} className="p-ml-2" />
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }
import React, { useState, useEffect } from 'react';
import SurveyCard from './SurveyCard';
import AddSurvey from '../SurveysAdding/AddSurvey';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; 
import { fetchSurveys, getSurveysBySearch } from '../../Requests';
import SurveyDetails from './SurveyDetails';
import './SurveysPage.css';

export default function SurveysPage() {
    const [surveys, setSurveys] = useState([]);
    const [showAddSurvey, setShowAddSurvey] = useState(false);
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const getSurveys = async () => {
            try {
                const result = await fetchSurveys(); // אם יש לך פונקציה כזו, כדאי לשנות את זה להיות getSurveys
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
        setShowAddSurvey(false);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = async () => {
        try {
            const result = await getSurveysBySearch(searchText);
            if (result.status === 200 && result.data) {
                setSurveys(result.data);
            } else {
                console.error("Failed to fetch surveys by search");
            }
        } catch (error) {
            console.error("Error fetching surveys by search", error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <div className="page-container">
            <h2>Active Surveys</h2>
            <div className="p-inputgroup">
                <InputText
                    placeholder="Search by survey name, manager ID, or active status..."
                    value={searchText}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                />
                <Button icon="pi pi-search" className="p-button-warning" onClick={handleSearch} />
            </div>
            <Button label="Add New Survey" icon="pi pi-plus" onClick={handleAddSurvey} className="p-mt-3" />
            {showAddSurvey && (
                <div className="p-mt-4">
                    <AddSurvey onClose={handleCloseAddSurvey} onSurveyAdded={handleSurveyAdded} />
                </div>
            )}
            <div className="allSurveys">
                {surveys.map((survey) => (
                    <div className="surveyItem" key={survey.id}>
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