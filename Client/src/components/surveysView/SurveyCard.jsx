import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import SurveyDetails from './SurveyDetails';
import { fetchSurveyResults, deleteData, postData } from '../../Requests';
import { useUser } from '../personalArea/UserContext';


const SurveyCard = ({ survey }) => {
    const { currentUser } = useUser(); // קבלת פרטי המשתמש מהקונטקסט
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const navigate = useNavigate();
    const toast = useRef(null);

    const handleViewSurvey = async () => {
        try {
            const results = await fetchSurveyResults(survey.id);
            const userIds = results.userIds;

            // check if currentUser.id is already in the userIds array
            if (userIds.includes(currentUser.id)) {
                toast.current.show({ severity: 'error', summary: 'Notice', detail: 'You have already participated in this survey.', life: 3000 });
                return;
            }

            setSelectedSurvey(survey);
        } catch (error) {
            console.error("Error fetching survey results:", error);
        }
    };

    const handleCloseSurveyDetail = () => {
        setSelectedSurvey(null);
    };

    const handleViewSurveyResults = () => {
        if (survey.active) {
            // הסקר אקטיבי, רק המשתמש הנוכחי יכול להמשיך
            if (currentUser.id === survey.userId) {
                navigate(`/users/${currentUser.id}/surveys/${survey.id}/results`);
            } else {
                // המשתמש הנוכחי אינו בעל הסקר, הצג הודעת שגיאה
                toast.current.show({ severity: 'error', summary: 'Notice', detail: 'Only the survey owner can view results when the survey is active.' });
            }
        } else {
            // הסקר לא אקטיבי, כל משתמש יכול להמשיך
            navigate(`/users/${currentUser.id}/surveys/${survey.id}/results`);
        }
    };
    const handledeleteSurvey = async () => {
        if (currentUser.id === survey.userId) {
            const result = await deleteData(survey.id, 'surveys');
            if (result.success) {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Survey deleted successfully.' });
                navigate('/users/surveys');
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete survey.' });
            }
        } else {
            toast.current.show({ severity: 'error', summary: 'Notice', detail: 'Only the survey owner can delete the survey.' });
        }
    };
    
    const handleUpdateSurvey = async () => {
        //  להוסיף בדיקת הרשאה- רק אם המשתמש מנהל או סוקר
        const result = await postData(survey.id, 'surveys');
        if (result.success) {
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Survey deleted successfully.' });
            navigate('/users/surveys');
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete survey.' });
        }
    };

    return (
        <Card className='surveyCard' title={survey.surveyName} subTitle={survey.active ? "Active" : "Inactive"}>
            <Toast ref={toast} position="center" />
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
                    onClick={handleViewSurveyResults} />
                <Button
                    className="deleteSurveyButton"
                    icon="pi pi-trash"
                    rounded outlined severity="info"
                    aria-label="viewSurveyResults"
                    onClick={handledeleteSurvey} />
                <Button
                    className="updateSurveyButton"
                    icon="pi pi-ban"
                    rounded outlined severity="info"
                    aria-label="updataSurveyStatus"
                    onClick={handleUpdateSurvey} />
            </div>
            {selectedSurvey && (
                <SurveyDetails survey={selectedSurvey} onClose={handleCloseSurveyDetail} />
            )}
        </Card>
    );
};

export default SurveyCard;

