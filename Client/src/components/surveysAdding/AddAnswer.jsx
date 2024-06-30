

// import React, { useState } from 'react';

// const AddAnswer = ({ questionIndex, onAddAnswer }) => {
//     const [answers, setAnswers] = useState([{ answer: '', answerId: 1 }]);

//     const handleAnswerChange = (index, e) => {
//         const { name, value } = e.target;
//         const newAnswers = [...answers];
//         newAnswers[index][name] = value;
//         setAnswers(newAnswers);
//         onAddAnswer(questionIndex, newAnswers); // Update parent component's state with the new answers
//     };

//     const handleAddAnswer = () => {
//         if (answers.length < 6) {
//             setAnswers([...answers, { answer: '', answerId: answers.length + 1 }]);
//         } else {
//             alert('You can add up to 6 answers only.');
//         }
//     };

//     return (
//         <div>
//             <h3>Add Answers</h3>
//             {answers.map((answer, index) => (
//                 <div key={index}>
//                     <label htmlFor={`answer${index}`}>Answer {index + 1}:</label>
//                     <input
//                         type="text"
//                         id={`answer${index}`}
//                         name="answer"
//                         value={answer.answer}
//                         onChange={(e) => handleAnswerChange(index, e)}
//                     />
//                 </div>
//             ))}
//             <button type="button" onClick={handleAddAnswer}>
//                 Add Another Answer
//             </button>
//         </div>
//     );
// };

// export default AddAnswer;
import React, { useState } from 'react';
import './AddQuestionsAnswersStyle.css';

const AddAnswer = ({ questionIndex, onAddAnswer }) => {
    const [answers, setAnswers] = useState([{ answer: '', answerId: 1 }]);

    const handleAnswerChange = (index, e) => {
        const { name, value } = e.target;
        const newAnswers = [...answers];
        newAnswers[index][name] = value;
        setAnswers(newAnswers);
        onAddAnswer(questionIndex, newAnswers); // Update parent component's state with the new answers
    };

    const handleAddAnswer = () => {
        if (answers.length < 6) {
            const newAnswers = [...answers, { answer: '', answerId: answers.length + 1 }];
            setAnswers(newAnswers);
            onAddAnswer(questionIndex, newAnswers); // Update parent component's state with the new answers
        } else {
            alert('You can add up to 6 answers only.');
        }
    };

    return (
        <div className="add-answer-container">
            <h4>Add Answers</h4>
            {answers.map((answer, index) => (
                <div key={index} className="answer-block">
                    <label htmlFor={`answer${index}`}>Answer {index + 1}:</label>
                    <input
                        type="text"
                        id={`answer${index}`}
                        name="answer"
                        value={answer.answer}
                        onChange={(e) => handleAnswerChange(index, e)}
                    />
                </div>
            ))}
            <button type="button" onClick={handleAddAnswer} className="add-answer-button">
                +Add Answer
            </button>
        </div>
    );
};

export default AddAnswer;
