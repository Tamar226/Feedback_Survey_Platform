import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import SurveyDetails from './SurveyDetails';
import { fetchSurveyResults, deleteData, putData, fetchSurveyDetails } from '../../Requests';
import { useUser } from '../personalArea/UserContext';

const SurveyCard = ({ survey, onSurveyDelete }) => {
    const { currentUser } = useUser();
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [currentSurvey, setCurrentSurvey] = useState(survey);
    const navigate = useNavigate();
    const toast = useRef(null);

    useEffect(() => {
        setCurrentSurvey(survey);
    }, [survey]);

    const handleViewSurvey = async () => {
        try {
            const results = await fetchSurveyResults(currentSurvey.id);
            const userIds = results.userIds;

            if (userIds.includes(currentUser.id)) {
                toast.current.show({ severity: 'error', summary: 'Notice', detail: 'You have already participated in this survey.', life: 3000 });
                return;
            }

            setSelectedSurvey(currentSurvey);
        } catch (error) {
            console.error("Error fetching survey results:", error);
        }
    };

    const handleCloseSurveyDetail = () => {
        setSelectedSurvey(null);
    };

    const handleViewSurveyResults = () => {
        if (currentSurvey.active) {
            if (currentUser.id === currentSurvey.userId) {
                navigate(`/users/${currentUser.id}/surveys/${currentSurvey.id}/results`);
            } else {
                toast.current.show({ severity: 'error', summary: 'Notice', detail: 'Only the survey owner can view results when the survey is active.' });
            }
        } else {
            navigate(`/users/${currentUser.id}/surveys/${currentSurvey.id}/results`);
        }
    };

    const handleDeleteSurvey = async () => {
        if (currentUser.id === currentSurvey.userId) {
            const result = await deleteData(currentSurvey.id, 'surveys');
            if (result.status === 200) {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Survey deleted successfully.' });
                onSurveyDelete(currentSurvey.id); // Call the callback to remove the survey from the list
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete survey.' });
            }
        } else {
            toast.current.show({ severity: 'error', summary: 'Notice', detail: 'Only the survey owner can delete the survey.' });
        }
    };

    const handleUpdateSurvey = async () => {
        if (currentUser.id === currentSurvey.userId) {
            const upSurvey = {
                surveyName: currentSurvey.surveyName,
                active: !currentSurvey.active,
                userId: currentSurvey.userId,
                questions: currentSurvey.questions,
                userIds: currentSurvey.userIds
            };
            const result = await putData(currentSurvey.id, upSurvey, 'surveys');
            if (result.status === 200) {
                const updatedSurvey = await fetchSurveyDetails(currentSurvey.id);
                setCurrentSurvey(updatedSurvey);
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Survey updated successfully.' });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update survey.' });
            }
        } else {
            toast.current.show({ severity: 'error', summary: 'Notice', detail: 'Only the survey owner can update the survey.' });
        }
    };

    return (
        <Card className='surveyCard' title={currentSurvey.surveyName} subTitle={currentSurvey.active ? "Active" : "Inactive"}>
            <Toast ref={toast} position="center" />
            <div className='SurveysButtonsContainer'>
                <Button
                    className='viewSurveyButton'
                    icon="pi pi-eye"
                    rounded outlined severity="info"
                    aria-label="viewSurvey"
                    onClick={handleViewSurvey}
                    disabled={!currentSurvey.active} />
                <Button
                    className="viewSurveyResultsButton"
                    icon="pi pi-chart-line"
                    rounded outlined severity="info"
                    aria-label="viewSurveyResults"
                    onClick={handleViewSurveyResults} />
                {currentUser && currentUser.id === currentSurvey.userId && (
                    <>
                        <Button
                            className="deleteSurveyButton"
                            icon="pi pi-trash"
                            rounded outlined severity="info"
                            aria-label="deleteSurvey"
                            onClick={handleDeleteSurvey} />
                        <Button
                            className="updateSurveyButton"
                            icon="pi pi-pencil"
                            rounded outlined severity="info"
                            aria-label="updateSurvey"
                            onClick={handleUpdateSurvey} />
                    </>
                )}
            </div>
            {selectedSurvey && (
                <SurveyDetails survey={selectedSurvey} onClose={handleCloseSurveyDetail} />
            )}
        </Card>
    );
};

export default SurveyCard;
