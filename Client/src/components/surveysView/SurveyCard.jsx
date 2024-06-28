// // import React, { useState } from 'react';
// // import { Card } from 'primereact/card';
// // import { Button } from 'primereact/button';
// // import SurveyDetails from './SurveyDetails';

// // const SurveyCard = ({ survey }) => {
// //     const [selectedSurvey, setSelectedSurvey] = useState(null);

// //     const handleViewSurvey = () => {
// //         setSelectedSurvey(survey);
// //     };

// //     const handleCloseSurveyDetail = () => {
// //         setSelectedSurvey(null);
// //     };

// //     return (
// //         <Card title={survey.surveyName} subTitle={survey.active ? "Active" : "Inactive"}>
// //             <Button label="View Survey" icon="pi pi-eye" onClick={handleViewSurvey} />
// //             {selectedSurvey && (
// //                 <SurveyDetails survey={selectedSurvey} onClose={handleCloseSurveyDetail} />
// //             )}
             
// //         </Card>
// //     );
// // };

// // export default SurveyCard;
// // SurveyCard.jsx

// import React, { useState } from 'react';
// import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';
// import { Link } from 'react-router-dom';
// import SurveyDetails from './SurveyDetails';

// const SurveyCard = ({ survey }) => {
//     const [selectedSurvey, setSelectedSurvey] = useState(null);

//     const handleViewSurvey = () => {
//         setSelectedSurvey(survey);
//     };

//     const handleCloseSurveyDetail = () => {
//         setSelectedSurvey(null);
//     };

//     return (
//         <Card title={survey.surveyName} subTitle={survey.active ? "Active" : "Inactive"}>
//             <Button label="View Survey" icon="pi pi-eye" onClick={handleViewSurvey} />
//             <Link to={`/surveys/${survey.id}/results`}>
//                 <Button label="Survey Results" className="p-button-secondary p-button-raised p-ml-2" />
//             </Link>
//             {selectedSurvey && (
//                 <SurveyDetails survey={selectedSurvey} onClose={handleCloseSurveyDetail} />
//             )}
//         </Card>
//     );
// };

// export default SurveyCard;
import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import SurveyDetails from './SurveyDetails';

const SurveyCard = ({ survey }) => {
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const navigate = useNavigate();

    const handleViewSurvey = () => {
        setSelectedSurvey(survey);
    };

    const handleCloseSurveyDetail = () => {
        setSelectedSurvey(null);
    };

    const handleViewSurveyResults = () => {
        navigate(`/surveys/${survey.id}/results`);
    };

    return (
        <Card title={survey.surveyName} subTitle={survey.active ? "Active" : "Inactive"}>
            <Button label="View Survey" icon="pi pi-eye" onClick={handleViewSurvey} />
            <Button
                label="Survey Results"
                className="p-button-secondary p-button-raised p-ml-2"
                onClick={handleViewSurveyResults}
            />
            {selectedSurvey && (
                <SurveyDetails survey={selectedSurvey} onClose={handleCloseSurveyDetail} />
            )}
        </Card>
    );
};

export default SurveyCard;
