
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { InputText } from 'primereact/inputtext';
// import { InputNumber } from 'primereact/inputnumber';
// import { Checkbox } from 'primereact/checkbox';
// import { Button } from 'primereact/button';
// import { postData } from '../../Requests';
// import AddQuestions from './AddQuestions';

// const AddSurvey = ({ onClose, onSurveyAdded }) => {
//     const [surveyName, setSurveyName] = useState('');
//     const [managerId, setManagerId] = useState(null);
//     const [active, setActive] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [surveyId, setSurveyId] = useState(null);

//     const handleSubmit = async () => {
//         const surveyData = {
//             managerId,
//             surveyName,
//             active: active ? 1 : 0,
//         };

//         try {
//             const surveyResult = await postData(surveyData, setLoading, 'surveys');
//             if (surveyResult.code === 200) {
//                 setSurveyId(surveyResult.params.id);
//                 if (onSurveyAdded) {
//                     onSurveyAdded(surveyResult.params);
//                 } else {
//                     console.error('onSurveyAdded is not a function');
//                 }
//             } else {
//                 console.error('Failed to add survey:', surveyResult.message);
//             }
//         } catch (error) {
//             console.error('Error adding survey:', error);
//         }
//     };

//     return (
//         <div className="p-card p-shadow-3 p-p-3 p-mt-5">
//             <h3>Add New Survey</h3>
//             <div className="p-field">
//                 <label htmlFor="surveyName">Survey Name</label>
//                 <InputText id="surveyName" value={surveyName} onChange={(e) => setSurveyName(e.target.value)} />
//             </div>
//             <div className="p-field">
//                 <label htmlFor="managerId">Manager ID</label>
//                 <InputNumber id="managerId" value={managerId} onValueChange={(e) => setManagerId(e.value)} />
//             </div>
//             <div className="p-field-checkbox">
//                 <Checkbox inputId="active" checked={active} onChange={(e) => setActive(e.checked)} />
//                 <label htmlFor="active">Active</label>
//             </div>
//             <Button label="Submit Survey" icon="pi pi-check" onClick={handleSubmit} loading={loading} className="p-mt-4" />
//             {surveyId && (
//                 <AddQuestions
//                     surveyId={surveyId}
//                     setLoading={setLoading}
//                 />
//             )}
//         </div>
//     );
// };

// AddSurvey.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     onSurveyAdded: PropTypes.func.isRequired,
// };

// export default AddSurvey;
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { postData } from '../../Requests';
import AddQuestions from './AddQuestions';

const AddSurvey = ({ onClose, onSurveyAdded }) => {
    const [surveyName, setSurveyName] = useState('');
    const [managerId, setManagerId] = useState(null);
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [surveyId, setSurveyId] = useState(null);
    const [questions, setQuestions] = useState([]);

    const handleSubmit = async () => {
        const surveyData = {
            managerId,
            surveyName,
            active: active ? 1 : 0,
        };

        try {
            const surveyResult = await postData(surveyData, setLoading, 'surveys');
            if (surveyResult.code === 200) {
                setSurveyId(surveyResult.params.id);
                if (onSurveyAdded) {
                    onSurveyAdded(surveyResult.params);
                } else {
                    console.error('onSurveyAdded is not a function');
                }
            } else {
                console.error('Failed to add survey:', surveyResult.message);
            }
        } catch (error) {
            console.error('Error adding survey:', error);
        }
    };

    return (
        <div className="p-card p-shadow-3 p-p-3 p-mt-5">
            <h3>Add New Survey</h3>
            <div className="p-field">
                <label htmlFor="surveyName">Survey Name</label>
                <InputText id="surveyName" value={surveyName} onChange={(e) => setSurveyName(e.target.value)} />
            </div>
            <div className="p-field">
                <label htmlFor="managerId">Manager ID</label>
                <InputNumber id="managerId" value={managerId} onValueChange={(e) => setManagerId(e.value)} />
            </div>
            <div className="p-field-checkbox">
                <Checkbox inputId="active" checked={active} onChange={(e) => setActive(e.checked)} />
                <label htmlFor="active">Active</label>
            </div>
            <Button label="Submit Survey" icon="pi pi-check" onClick={handleSubmit} loading={loading} className="p-mt-4" />
            {surveyId && (
                <AddQuestions
                    surveyId={surveyId}
                    questions={questions}
                    setQuestions={setQuestions}
                    setLoading={setLoading}
                />
            )}
        </div>
    );
};

AddSurvey.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSurveyAdded: PropTypes.func.isRequired,
};

export default AddSurvey;
