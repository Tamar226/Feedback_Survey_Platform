import React, { useState, useEffect } from 'react';
import SurveyCard from './SurveyCard';
import AddSurvey from '../surveysAdding/AddSurvey';
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
    const [categories, setCategories] = useState({});

    useEffect(() => {
        const getSurveys = async () => {
            try {
                const result = await fetchSurveys();
                if (result.status === 200 && result.data) {
                    const fetchedSurveys = result.data[1][0];
                    setSurveys(fetchedSurveys);
                    updateCategories(fetchedSurveys);
                } else {
                    console.error("Failed to fetch surveys");
                }
            } catch (error) {
                console.error("Error fetching surveys", error);
            }
        };
        getSurveys();
    }, []);

    const updateCategories = (surveys) => {
        const updatedCategories = {};
        surveys.forEach(survey => {
            const category = survey.category.toLowerCase();
            if (!updatedCategories[category]) {
                updatedCategories[category] = [];
            }
            updatedCategories[category].push(survey);
        });
        setCategories(updatedCategories);
    };

    const handleAddSurvey = () => {
        setShowAddSurvey(true);
    };

    const handleCloseAddSurvey = () => {
        setShowAddSurvey(false);
    };

    const handleSurveyAdded = (newSurvey) => {
        const updatedSurveys = [...surveys, newSurvey];
        setSurveys(updatedSurveys);
        updateCategories(updatedSurveys);
        setShowAddSurvey(false);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSurveySelect = (survey) => {
        setSelectedSurvey(survey);
    };

    const handleSurveyDelete = (surveyId) => {
        const updatedSurveys = surveys.filter(survey => survey.id !== surveyId);
        setSurveys(updatedSurveys);
        updateCategories(updatedSurveys);
    };

    const surveyTemplate = (survey) => {
        return (
            <div className="surveyItem" key={survey.id}>
                <SurveyCard
                    survey={survey}
                    onSelect={() => handleSurveySelect(survey)}
                    onSurveyDelete={handleSurveyDelete}
                />
            </div>
        );
    };

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

    const filteredSurveys = surveys.filter(survey =>
        survey.surveyName.toLowerCase().includes(searchText.toLowerCase()) ||
        survey.category.toLowerCase().includes(searchText.toLowerCase())
    );

    const updatedCategories = {};
    filteredSurveys.forEach(survey => {
        if (!updatedCategories[survey.category]) {
            updatedCategories[survey.category] = [];
        }
        updatedCategories[survey.category].push(survey);
    });

    return (
        <div className="page-container">
            <h1>Surveys</h1>
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

            {Object.keys(updatedCategories).map(category => (
                <div key={category} className='surveys-category'>
                    <h3 className='surveyCategory'>{category}</h3>
                    {updatedCategories[category].length > 3 ? (
                        <Carousel 
                            value={updatedCategories[category]} 
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
                            {updatedCategories[category].map(survey => surveyTemplate(survey))}
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
