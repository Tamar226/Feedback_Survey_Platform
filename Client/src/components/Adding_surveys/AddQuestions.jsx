// // src/components/SurveyQuestion.js

// import React, { useState } from 'react';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Divider } from 'primereact/divider';
// import { Toast } from 'primereact/toast';

// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

// const SurveyQuestion = ({ onAddQuestion }) => {
//     const [question, setQuestion] = useState('');
//     const [options, setOptions] = useState(['', '', '', '']);
//     const toast = React.useRef(null);

//     const handleAddQuestion = () => {
//         if (!question || options.some(opt => !opt)) {
//             toast.current.show({severity: 'error', summary: 'Error', detail: 'Please fill all fields', life: 3000});
//             return;
//         }

//         onAddQuestion({ question, options });
//         setQuestion('');
//         setOptions(['', '', '', '']);
//     };

//     const handleOptionChange = (index, value) => {
//         const newOptions = [...options];
//         newOptions[index] = value;
//         setOptions(newOptions);
//     };

//     return (
//         <div className="p-card p-shadow-3 p-p-3">
//             <Toast ref={toast} />
//             <h3>Add Survey Question</h3>
//             <div className="p-field">
//                 <label htmlFor="question">Question</label>
//                 <InputText id="question" value={question} onChange={(e) => setQuestion(e.target.value)} />
//             </div>
//             <Divider />
//             {options.map((option, index) => (
//                 <div className="p-field" key={index}>
//                     <label htmlFor={`option${index}`}>Option {index + 1}</label>
//                     <InputText id={`option${index}`} value={option} onChange={(e) => handleOptionChange(index, e.target.value)} />
//                 </div>
//             ))}
//             <Button label="Add Question" icon="pi pi-plus" className="p-mt-2" onClick={handleAddQuestion} />
//         </div>
//     );
// };

// export default SurveyQuestion;
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const AddQuestions = ({ onAddQuestion }) => {
    const [question, setQuestion] = useState('');

    const handleAddQuestion = () => {
        onAddQuestion(question);
        setQuestion('');
    };

    return (
        <div className="p-field">
            <label htmlFor="question">Question</label>
            <InputText id="question" value={question} onChange={(e) => setQuestion(e.target.value)} />
            <Button label="Add Question" icon="pi pi-plus" onClick={handleAddQuestion} className="p-ml-2" />
        </div>
    );
};

export default AddQuestions;
