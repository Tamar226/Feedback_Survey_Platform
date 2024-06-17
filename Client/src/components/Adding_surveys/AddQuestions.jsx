
// import React, { useState } from 'react';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { postData } from '../../Requests';
// import AddAnswers from './AddAnswers';

// const AddQuestions = ({ surveyId, questions, setQuestions, setLoading }) => {
//     const [newQuestion, setNewQuestion] = useState('');

//     const handleAddQuestion = async () => {
//         if (!surveyId) {
//             console.error('Survey ID is not available.');
//             return;
//         }

//         const questionData = { question: newQuestion, surveyID: surveyId };
//         const questionResult = await postData(questionData, setLoading, 'questions');

//         if (questionResult.code === 200) {
//             const questionId = questionResult.params.id;
//             setQuestions([...questions, { id: questionId, question: newQuestion, answers: [] }]);
//             setNewQuestion('');
//         } else {
//             console.error('Failed to add question:', questionResult.message);
//         }
//     };

//     return (
//         <div>
//             <div className="p-field">
//                 <label htmlFor="newQuestion">New Question</label>
//                 <InputText id="newQuestion" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
//             </div>
//             <Button label="Add Question" icon="pi pi-plus" onClick={handleAddQuestion} disabled={questions.length >= 10} />

//             {questions.map((q, qIndex) => (
//                 <div key={q.id} className="p-field p-mt-3">
//                     <h4>Question {qIndex + 1}: {q.question}</h4>
//                     <AddAnswers 
//                         questionId={q.id} 
//                         answers={q.answers} 
//                         setQuestions={setQuestions} 
//                         questionIndex={qIndex}
//                         setLoading={setLoading} 
//                     />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default AddQuestions;
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { postData } from '../../Requests';
import AddAnswers from './AddAnswers';

const AddQuestions = ({ surveyId, questions, setQuestions, setLoading }) => {
    const [newQuestion, setNewQuestion] = useState('');

    const handleAddQuestion = async () => {
        if (!surveyId) {
            console.error('Survey ID is not available.');
            return;
        }

        const questionData = { question: newQuestion, surveyID: surveyId };
        const questionResult = await postData(questionData, setLoading, 'questions');

        if (questionResult.code === 200) {
            const questionId = questionResult.params.id;
            setQuestions([...questions, { id: questionId, question: newQuestion, answers: [] }]);
            setNewQuestion('');
        } else {
            console.error('Failed to add question:', questionResult.message);
        }
    };

    return (
        <div>
            <div className="p-field">
                <label htmlFor="newQuestion">New Question</label>
                <InputText id="newQuestion" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
            </div>
            <Button label="Add Question" icon="pi pi-plus" onClick={handleAddQuestion} disabled={questions.length >= 10} />

            {questions.map((q, qIndex) => (
                <div key={q.id} className="p-field p-mt-3">
                    <h4>Question {qIndex + 1}: {q.question}</h4>
                    <AddAnswers 
                        questionId={q.id} 
                        answers={q.answers} 
                        setQuestions={setQuestions} 
                        questionIndex={qIndex}
                        setLoading={setLoading} 
                    />
                </div>
            ))}
        </div>
    );
};

export default AddQuestions;
