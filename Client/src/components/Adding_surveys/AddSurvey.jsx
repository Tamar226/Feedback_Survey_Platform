// import React, { useState } from 'react';
// import { postData } from '../../Requests';
// import { InputText } from 'primereact/inputtext';
// import { InputNumber } from 'primereact/inputnumber';
// import { Checkbox } from 'primereact/checkbox';
// import { Button } from 'primereact/button';
// import AddQuestions from './AddQuestions';

// const AddSurvey = () => {
//     const [surveyName, setSurveyName] = useState('');
//     const [managerId, setManagerId] = useState(null);
//     const [active, setActive] = useState(false);
//     const [questions, setQuestions] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const handleAddQuestion = () => {
//         setQuestions([...questions, { question: '', answers: [''] }]);
//     };

//     const handleQuestionChange = (index, value) => {
//         const newQuestions = [...questions];
//         newQuestions[index].question = value;
//         setQuestions(newQuestions);
//     };

//     const handleAnswerChange = (qIndex, aIndex, value) => {
//         const newQuestions = [...questions];
//         newQuestions[qIndex].answers[aIndex] = value;
//         setQuestions(newQuestions);
//     };

//     const handleAddAnswer = (index) => {
//         const newQuestions = [...questions];
//         if (newQuestions[index].answers.length < 5) {
//             newQuestions[index].answers.push('');
//             setQuestions(newQuestions);
//         }
//     };

//     const handleRemoveQuestion = (index) => {
//         const newQuestions = [...questions];
//         newQuestions.splice(index, 1);
//         setQuestions(newQuestions);
//     };

//     const handleRemoveAnswer = (qIndex, aIndex) => {
//         const newQuestions = [...questions];
//         newQuestions[qIndex].answers.splice(aIndex, 1);
//         setQuestions(newQuestions);
//     };

//     const handleSubmit = async () => {
//         const surveyData = {
//             managerId,
//             surveyName,
//             active: active ? 1 : 0,
//         };

//         try {
//             const surveyResult = await postData(surveyData, setLoading, 'surveys');
//             if (surveyResult.code === 200) {
//                 const surveyId = surveyResult.params.id;
//                 for (const question of questions) {
//                     const questionData = {
//                         question: question.question,
//                         surveyID: surveyId,
//                     };
//                     const questionResult = await postData(questionData, setLoading, 'questions');
//                     if (questionResult.code === 200) {
//                         const questionId = questionResult.params.id;
//                         for (const answer of question.answers) {
//                             const answerData = {
//                                 answer,
//                                 questionId,
//                                 answerId: question.answers.indexOf(answer) + 1,
//                             };
//                             await postData(answerData, setLoading, 'answers');
//                         }
//                     }
//                 }
//                 console.log('Survey and related questions and answers added successfully');
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
//             <div className="p-mt-3">
//                 <Button label="Add Question" icon="pi pi-plus" onClick={handleAddQuestion} disabled={questions.length >= 10} />
//             </div>
//             {questions.map((q, qIndex) => (
//                 <div key={qIndex} className="p-field p-mt-3">
//                     <label htmlFor={`question-${qIndex}`}>Question {qIndex + 1}</label>
//                     <InputText id={`question-${qIndex}`} value={q.question} onChange={(e) => handleQuestionChange(qIndex, e.target.value)} />
//                     <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-ml-2" onClick={() => handleRemoveQuestion(qIndex)} />
//                     {q.answers.map((a, aIndex) => (
//                         <div key={aIndex} className="p-field p-mt-2">
//                             <label htmlFor={`answer-${qIndex}-${aIndex}`}>Answer {aIndex + 1}</label>
//                             <InputText id={`answer-${qIndex}-${aIndex}`} value={a} onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)} />
//                             <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-ml-2" onClick={() => handleRemoveAnswer(qIndex, aIndex)} />
//                         </div>
//                     ))}
//                     <Button label="Add Answer" icon="pi pi-plus" onClick={() => handleAddAnswer(qIndex)} disabled={q.answers.length >= 5} className="p-mt-2" />
//                 </div>
//             ))}
//             <Button label="Submit Survey" icon="pi pi-check" onClick={handleSubmit} loading={loading} className="p-mt-4" />
//         </div>
//     );
// };

// export default AddSurvey;
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import AddQuestions from './AddQuestions';
import AddAnswers from './AddAnswers';
import { postData } from '../../Requests';

const AddSurvey = () => {
    const [surveyName, setSurveyName] = useState('');
    const [managerId, setManagerId] = useState(null);
    const [active, setActive] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleAddQuestion = (question) => {
        setQuestions([...questions, { question, answers: [] }]);
    };

    const handleAddAnswer = (qIndex, answer) => {
        const newQuestions = [...questions];
        if (newQuestions[qIndex].answers.length < 5) {
            newQuestions[qIndex].answers.push(answer);
            setQuestions(newQuestions);
        }
    };

    const handleRemoveQuestion = (index) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const handleRemoveAnswer = (qIndex, aIndex) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answers.splice(aIndex, 1);
        setQuestions(newQuestions);
    };

    const handleSubmit = async () => {
        try {
            // Step 1: Submit survey details
            const surveyData = {
                managerId,
                surveyName,
                active: active ? 1 : 0,
            };

            const surveyResult = await postData(surveyData, setLoading, 'surveys');

            if (surveyResult.code !== 200) {
                throw new Error('Failed to add survey.');
            }

            const surveyId = surveyResult.params.id;

            // Step 2: Submit each question and its answers
            for (const question of questions) {
                const questionData = {
                    question: question.question,
                    surveyID: surveyId,
                };

                const questionResult = await postData(questionData, setLoading, 'questions');

                if (questionResult.code !== 200) {
                    throw new Error('Failed to add question.');
                }

                const questionId = questionResult.params.id;

                // Submit answers for this question
                for (const answer of question.answers) {
                    const answerData = {
                        answer,
                        questionId,
                        answerId: question.answers.indexOf(answer) + 1,
                    };

                    const answerResult = await postData(answerData, setLoading, 'answers');

                    if (answerResult.code !== 200) {
                        throw new Error('Failed to add answer.');
                    }
                }
            }

            // All data submitted successfully
            console.log('Survey and related questions and answers added successfully');
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
            <AddQuestions onAddQuestion={handleAddQuestion} />
            {questions.map((q, qIndex) => (
                <div key={qIndex} className="p-field p-mt-3">
                    <label htmlFor={`question-${qIndex}`}>Question {qIndex + 1}</label>
                    <InputText id={`question-${qIndex}`} value={q.question} onChange={(e) => handleQuestionChange(qIndex, e.target.value)} />
                    <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-ml-2" onClick={() => handleRemoveQuestion(qIndex)} />
                    <AddAnswers qIndex={qIndex} onAddAnswer={handleAddAnswer} answers={q.answers} onRemoveAnswer={handleRemoveAnswer} />
                </div>
            ))}
            <Button label="Submit Survey" icon="pi pi-check" onClick={handleSubmit} loading={loading} className="p-mt-4" />
        </div>
    );
};

export default AddSurvey;
