
// import React, { useState } from 'react';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { postData } from '../../Requests';

// const AddAnswers = ({ questionId, answers, setQuestions, questionIndex, setLoading }) => {
//     const [newAnswer, setNewAnswer] = useState('');

//     const handleAddAnswer = async () => {
//         const answerData = { answer: newAnswer, questionId, answerId: answers.length + 1 };

//         const answerResult = await postData(answerData, setLoading, 'answers');

//         if (answerResult.code === 200) {
//             const newQuestions = [...questions];
//             newQuestions[questionIndex].answers.push(newAnswer);
//             setQuestions(newQuestions);
//             setNewAnswer('');
//         } else {
//             console.error('Failed to add answer:', answerResult.message);
//         }
//     };

//     const handleRemoveAnswer = (answerIndex) => {
//         const newQuestions = [...questions];
//         newQuestions[questionIndex].answers.splice(answerIndex, 1);
//         setQuestions(newQuestions);
//     };

//     return (
//         <div>
//             {answers.map((answer, index) => (
//                 <div key={index} className="p-field p-mt-2">
//                     <label htmlFor={`answer-${questionId}-${index}`}>Answer {index + 1}</label>
//                     <InputText
//                         id={`answer-${questionId}-${index}`}
//                         value={answer}
//                         onChange={(e) => {
//                             const newQuestions = [...questions];
//                             newQuestions[questionIndex].answers[index] = e.target.value;
//                             setQuestions(newQuestions);
//                         }}
//                     />
//                     <Button
//                         icon="pi pi-times"
//                         className="p-button-rounded p-button-danger p-ml-2"
//                         onClick={() => handleRemoveAnswer(index)}
//                     />
//                 </div>
//             ))}
//             <div className="p-field p-mt-3">
//                 <label htmlFor={`newAnswer-${questionId}`}>New Answer</label>
//                 <InputText
//                     id={`newAnswer-${questionId}`}
//                     value={newAnswer}
//                     onChange={(e) => setNewAnswer(e.target.value)}
//                 />
//                 <Button
//                     label="Add Answer"
//                     icon="pi pi-plus"
//                     onClick={handleAddAnswer}
//                     disabled={answers.length >= 5}
//                     className="p-mt-2"
//                 />
//             </div>
//         </div>
//     );
// };

// export default AddAnswers;
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { postData } from '../../Requests';

const AddAnswers = ({ questionId, answers, setQuestions, questionIndex, setLoading }) => {
    const [newAnswer, setNewAnswer] = useState('');

    const handleAddAnswer = async () => {
        if (!questionId) {
            console.error('Question ID is not available.');
            return;
        }

        const answerData = { answer: newAnswer, questionId };
        const answerResult = await postData(answerData, setLoading, 'answers');

        if (answerResult.code === 200) {
            const answerId = answerResult.params.id;
            const updatedQuestions = [...questions];
            updatedQuestions[questionIndex].answers.push({ id: answerId, answer: newAnswer });
            setQuestions(updatedQuestions);
            setNewAnswer('');
        } else {
            console.error('Failed to add answer:', answerResult.message);
        }
    };

    return (
        <div>
            <div className="p-field">
                <label htmlFor="newAnswer">New Answer</label>
                <InputText id="newAnswer" value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} />
            </div>
            <Button label="Add Answer" icon="pi pi-plus" onClick={handleAddAnswer} disabled={answers.length >= 6} />

            <ul>
                {answers.map((answer, index) => (
                    <li key={index}>{answer.answer}</li>
                ))}
            </ul>
        </div>
    );
};

export default AddAnswers;
