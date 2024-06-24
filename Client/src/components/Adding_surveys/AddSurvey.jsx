
// // import React, { useState } from 'react';
// // import AddQuestion from './AddQuestion';
// // import { postData } from '../../Requests';

// // const AddSurvey = ({ onSurveyAdded, onClose }) => {
// //     const [surveyData, setSurveyData] = useState({
// //         managerId: '',
// //         surveyName: '',
// //         active: 1,
// //         questions: []
// //     });

// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setSurveyData({ ...surveyData, [name]: value });
// //     };

// //     const handleAddQuestion = (newQuestions) => {
// //         setSurveyData({
// //             ...surveyData,
// //             questions: newQuestions
// //         });
// //     };

// //     const handleSubmitSurvey = async (e) => {
// //         e.preventDefault();
// //         const response = await postData(surveyData, null, 'surveys');
// //         if (response.code === 200) {
// //             onSurveyAdded(response.params);
// //         } else {
// //             console.error("Error adding survey:", response.message);
// //         }
// //         onClose();
// //     };

// //     return (
// //         <div>
// //             <h2>Add Survey</h2>
// //             <form onSubmit={handleSubmitSurvey}>
// //                 <div>
// //                     <label htmlFor="managerId">Manager ID:</label>
// //                     <input
// //                         type="text"
// //                         id="managerId"
// //                         name="managerId"
// //                         value={surveyData.managerId}
// //                         onChange={handleInputChange}
// //                     />
// //                 </div>
// //                 <div>
// //                     <label htmlFor="surveyName">Survey Name:</label>
// //                     <input
// //                         type="text"
// //                         id="surveyName"
// //                         name="surveyName"
// //                         value={surveyData.surveyName}
// //                         onChange={handleInputChange}
// //                     />
// //                 </div>

// //                 <AddQuestion onAddQuestion={handleAddQuestion} />

// //                 <button type="submit">Submit Survey</button>
// //             </form>
// //         </div>
// //     );
// // };

// // export default AddSurvey;
// import React, { useState } from 'react';
// import AddQuestion from './AddQuestion';
// import { postData } from '../../Requests';

// const AddSurvey = ({ onSurveyAdded, onClose }) => {
//     const [surveyData, setSurveyData] = useState({
//         managerId: '',
//         surveyName: '',
//         active: 1,
//         questions: []
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setSurveyData({ ...surveyData, [name]: value });
//     };

//     const handleAddQuestion = (newQuestions) => {
//         setSurveyData({
//             ...surveyData,
//             questions: newQuestions
//         });
//     };

//     const handleSubmitSurvey = async (e) => {
//         e.preventDefault();
//         console.log(surveyData);
//         try {
//             const response = await postData(surveyData, null, 'surveys');
//             if (response.code === 200) {
//                 onSurveyAdded(response.params);
//             } else {
//                 console.error("Error adding survey:", response.message);
//             }
//         } catch (error) {
//             console.error("Error adding survey:", error);
//         }
//         onClose();
//     };

//     return (
//         <div>
//             <h2>Add Survey</h2>
//             <form onSubmit={handleSubmitSurvey}>
//                 <div>
//                     <label htmlFor="managerId">Manager ID:</label>
//                     <input
//                         type="text"
//                         id="managerId"
//                         name="managerId"
//                         value={surveyData.managerId}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="surveyName">Survey Name:</label>
//                     <input
//                         type="text"
//                         id="surveyName"
//                         name="surveyName"
//                         value={surveyData.surveyName}
//                         onChange={handleInputChange}
//                     />
//                 </div>

//                 <AddQuestion onAddQuestion={handleAddQuestion} />

//                 <button type="submit">Submit Survey</button>
//             </form>
//         </div>
//     );
// };

// export default AddSurvey;
import React, { useState } from 'react';
import AddQuestion from './AddQuestion';
import { postData } from '../../Requests'; // Import the postData function

const AddSurvey = ({ onClose, onSurveyAdded }) => {
    const [surveyData, setSurveyData] = useState({
        managerId: '',
        surveyName: '',
        active: 1,
        questions: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSurveyData({ ...surveyData, [name]: value });
    };

    const handleAddQuestion = (newQuestions) => {
        setSurveyData({ ...surveyData, questions: newQuestions });
    };

    const handleSubmitSurvey = async (e) => {
        e.preventDefault();

        if (!surveyData.managerId || !surveyData.surveyName || surveyData.questions.length === 0) {
            alert('Please complete all fields and add at least one question.');
            return;
        }

        for (const question of surveyData.questions) {
            if (!question.question || question.answers.length === 0) {
                alert('Please complete all questions and add at least one answer per question.');
                return;
            }
        }

        console.log('Survey data:', surveyData); // Check what is being sent

        try {
            const result = await postData(surveyData, null, 'surveys');
            if (result.code === 200) {
                onSurveyAdded(result.params);
                onClose();
            } else {
                console.error('Failed to add survey:', result.message);
            }
        } catch (error) {
            console.error('Error adding survey:', error);
        }
    };

    return (
        <div>
            <h2>Add Survey</h2>
            <form onSubmit={handleSubmitSurvey}>
                <div>
                    <label htmlFor="managerId">Manager ID:</label>
                    <input type="text" id="managerId" name="managerId" value={surveyData.managerId} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="surveyName">Survey Name:</label>
                    <input type="text" id="surveyName" name="surveyName" value={surveyData.surveyName} onChange={handleInputChange} />
                </div>
                <AddQuestion onAddQuestion={handleAddQuestion} />
                <button type="submit">Submit Survey</button>
            </form>
        </div>
    );
};

export default AddSurvey;


