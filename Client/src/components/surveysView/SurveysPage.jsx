// import React, { useState, useEffect } from 'react';
// import SurveyCard from './SurveyCard';
// import AddSurvey from '../SurveysAdding/AddSurvey.jsx';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext'; 
// import { fetchSurveys } from '../../Requests';
// import SurveyDetails from './SurveyDetails';
// import './SurveysPage.css';

// export default function SurveysPage() {
//     const [surveys, setSurveys] = useState([]);
//     const [showAddSurvey, setShowAddSurvey] = useState(false);
//     const [selectedSurvey, setSelectedSurvey] = useState(null);
//     const [searchText, setSearchText] = useState('');

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

//     const handleSearchChange = (e) => {
//         setSearchText(e.target.value);
//     };

//     // Filter surveys based on search text and category
//     const filteredSurveys = surveys.filter(survey =>
//         survey.surveyName.toLowerCase().includes(searchText.toLowerCase()) ||
//         survey.category.toLowerCase().includes(searchText.toLowerCase())
//     );

//     // Group surveys by category
//     const categories = {};
//     filteredSurveys.forEach(survey => {
//         if (!categories[survey.category]) {
//             categories[survey.category] = [];
//         }
//         categories[survey.category].push(survey);
//     });

//     return (
//         <div className="page-container">
//             <h2>Active Surveys</h2>
//             <div className="p-inputgroup">
//                 <InputText
//                     placeholder="Search by survey name, category, or active status..."
//                     value={searchText}
//                     onChange={handleSearchChange}
//                 />
//                 <Button icon="pi pi-search" className="p-button-warning" />
//             </div><br/>
//             <Button label="Add New Survey" icon="pi pi-plus" onClick={handleAddSurvey} className="p-mt-3" />   
//             {showAddSurvey && (
//                 <div className="p-mt-4">
//                     <AddSurvey onClose={handleCloseAddSurvey} onSurveyAdded={handleSurveyAdded} />
//                 </div>
//             )}

//             {/* Render surveys by category */}
//             {Object.keys(categories).map(category => (
//                 <div key={category} className='surveys-category'>
//                     <h3>{category}</h3>
//                     <div className="allSurveys"> 
//                         {categories[category].map(survey => (
//                             <div className="surveyItem" key={survey.id}>
//                                 <SurveyCard
//                                     survey={survey}
//                                     onSelect={() => setSelectedSurvey(survey)}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ))}

//             {/* Display selected survey details */}
//             {selectedSurvey && (
//                 <SurveyDetails
//                     survey={selectedSurvey}
//                     onClose={() => setSelectedSurvey(null)}
//                     userId={1}
//                 />
//             )}
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import SurveyCard from './SurveyCard';
import AddSurvey from '../SurveysAdding/AddSurvey.jsx';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Carousel } from 'primereact/carousel';
import { fetchSurveys } from '../../Requests';
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
        setShowAddSurvey(false);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const filteredSurveys = surveys.filter(survey =>
        survey.surveyName.toLowerCase().includes(searchText.toLowerCase()) ||
        survey.category.toLowerCase().includes(searchText.toLowerCase())
    );

    const categories = {};
    filteredSurveys.forEach(survey => {
        if (!categories[survey.category]) {
            categories[survey.category] = [];
        }
        categories[survey.category].push(survey);
    });

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const surveyTemplate = (survey) => {
        return (
            <div className="surveyItem" key={survey.id}>
                <SurveyCard
                    survey={survey}
                    onSelect={() => setSelectedSurvey(survey)}
                />
            </div>
        );
    };

    return (
        <div className="page-container">
            <h2>Active Surveys</h2>
            <div className="p-inputgroup">
                <InputText
                    placeholder="Search by survey name, category, or active status..."
                    value={searchText}
                    onChange={handleSearchChange}
                />
                <Button icon="pi pi-search" className="p-button-warning" />
            </div><br/>
            <Button label="Add New Survey" icon="pi pi-plus" onClick={handleAddSurvey} className="p-mt-3" />   
            {showAddSurvey && (
                <div className="p-mt-4">
                    <AddSurvey onClose={handleCloseAddSurvey} onSurveyAdded={handleSurveyAdded} />
                </div>
            )}

            {Object.keys(categories).map(category => (
                <div key={category} className='surveys-category'>
                    <h3>{category}</h3>
                    {categories[category].length > 3 ? (
                        <Carousel 
                            value={categories[category]} 
                            numVisible={3} 
                            numScroll={1} 
                            responsiveOptions={responsiveOptions} 
                            className="custom-carousel" 
                            circular 
                            autoplayInterval={3000} 
                            itemTemplate={(survey) => surveyTemplate(survey)} 
                        />
                    ) : (
                        <div className="allSurveys">
                            {categories[category].map(survey => surveyTemplate(survey))}
                        </div>
                    )}
                </div>
            ))}

            {selectedSurvey && (
                <SurveyDetails
                    survey={selectedSurvey}
                    onClose={() => setSelectedSurvey(null)}
                    userId={1}
                />
            )}
        </div>
    );
}

