// import React, { useState } from 'react';
// import AddQuestion from './AddQuestion';
// import { postData } from '../../Requests';
// import { Button } from 'primereact/button';
// import { AutoComplete } from 'primereact/autocomplete';
// import './AddSurvey.css';

// const AddSurvey = ({ onSurveyAdded, onClose }) => {
//     const [surveyData, setSurveyData] = useState({
//         userId: '',
//         surveyName: '',
//         active: 1,
//         category: '',
//         questions: []
//     });

//     const categories = [
//         'Law and Legislation',
//         'Business and Entrepreneurship',
//         'Family and Children',
//         'Travel and Tourism',
//         'Food and Cooking',
//         'Sports and Fitness',
//         'Culture and Leisure',
//         'Environment and Ecology',
//         'Education and Learning',
//         'Society and Community',
//         'Health and Medicine',
//         'Technology and Internet',
//         'Economics and Finance'
//     ];

//     const [filteredCategories, setFilteredCategories] = useState([]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setSurveyData({ ...surveyData, [name]: value });
//     };

//     const handleCategoryChange = (e) => {
//         setSurveyData({ ...surveyData, category: e.value });
//     };

//     const searchCategories = (event) => {
//         setFilteredCategories(categories.filter(category => category.toLowerCase().includes(event.query.toLowerCase())));
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
//             if (response.code === 201) {
//                 onSurveyAdded(response.params[0]);
//             } else {
//                 console.error("Error adding survey:", response.message);
//             }
//         } catch (error) {
//             console.error("Error adding survey:", error);
//         }
//         onClose();
//     };

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <div className="modal-header">
//                     <h2>Add Survey</h2>
//                     <button className="close-button" onClick={onClose}>✖</button>
//                 </div>
//                 <form onSubmit={handleSubmitSurvey}>
//                     <div className="p-field">
//                         <label htmlFor="userId">User ID:</label>
//                         <input
//                             type="text"
//                             id="userId"
//                             name="userId"
//                             value={surveyData.userId}
//                             onChange={handleInputChange}
//                             className="p-inputtext"
//                         />
//                     </div>
//                     <div className="p-field">
//                         <label htmlFor="surveyName">Survey Name:</label>
//                         <input
//                             type="text"
//                             id="surveyName"
//                             name="surveyName"
//                             value={surveyData.surveyName}
//                             onChange={handleInputChange}
//                             className="p-inputtext"
//                         />
//                     </div>
//                     <div className="p-field">
//                         <label htmlFor="category">Category:</label>
//                         <AutoComplete
//                             id="category"
//                             value={surveyData.category}
//                             suggestions={filteredCategories}
//                             completeMethod={searchCategories}
//                             onChange={handleCategoryChange}
//                             placeholder="Search for a category"
//                             className="p-inputtext"
//                         />
//                     </div>

//                     <AddQuestion onAddQuestion={handleAddQuestion} />

//                     <div className="p-d-flex p-jc-center p-mt-4">
//                         <Button type="submit" label="Submit Survey" icon="pi pi-check" className="p-button-success" />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddSurvey;
import React, { useState } from 'react';
import AddQuestion from './AddQuestion';
import { postData } from '../../Requests';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import './AddSurvey.css';
import { useUser } from '../personalArea/UserContext';

const AddSurvey = ({ onSurveyAdded, onClose }) => {
    const { currentUser } = useUser();
    const [surveyData, setSurveyData] = useState({
        userId: currentUser.id,
        surveyName: '',
        active: 1,
        category: '',
        questions: []
    });

    const categories = [
        'Law and Legislation',
        'Business and Entrepreneurship',
        'Family and Children',
        'Travel and Tourism',
        'Food and Cooking',
        'Sports and Fitness',
        'Culture and Leisure',
        'Environment and Ecology',
        'Education and Learning',
        'Society and Community',
        'Health and Medicine',
        'Technology and Internet',
        'Economics and Finance'
    ];

    const [filteredCategories, setFilteredCategories] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSurveyData({ ...surveyData, [name]: value });
    };

    const handleCategoryChange = (e) => {
        setSurveyData({ ...surveyData, category: e.value });
    };

    const searchCategories = (event) => {
        setFilteredCategories(categories.filter(category => category.toLowerCase().includes(event.query.toLowerCase())));
    };

    const handleAddQuestion = (newQuestions) => {
        setSurveyData({
            ...surveyData,
            questions: newQuestions
        });
    };

    const handleSubmitSurvey = async (e) => {
        e.preventDefault();
        try {
            const response = await postData(surveyData, null, 'surveys');
            if (response.code === 201) {
                onSurveyAdded(response.params[0]);
            } else {
                console.error("Error adding survey:", response.message);
            }
        } catch (error) {
            console.error("Error adding survey:", error);
        }
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add Survey</h2>
                    <button className="close-button" onClick={onClose}>✖</button>
                </div>
                <form onSubmit={handleSubmitSurvey} className="survey-form">
                    <div className="form-group">
                        <label htmlFor="surveyName">Survey Name:</label>
                        <input
                            type="text"
                            id="surveyName"
                            name="surveyName"
                            value={surveyData.surveyName}
                            onChange={handleInputChange}
                            className="p-inputtext"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <AutoComplete
                            id="category"
                            value={surveyData.category}
                            suggestions={filteredCategories}
                            completeMethod={searchCategories}
                            onChange={handleCategoryChange}
                            placeholder="Search for a category"
                            className="p-inputtext-category"
                        />
                    </div>

                    <AddQuestion onAddQuestion={handleAddQuestion} />

                    <div className="button-group">
                        <Button type="submit" label="Submit Survey" icon="pi pi-send" className="p-button-success" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSurvey;
