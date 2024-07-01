import React, { useState } from 'react';
import AddAnswer from './AddAnswer';

const AddQuestion = ({ onAddQuestion }) => {
    const [questions, setQuestions] = useState([{ question: '', answers: [] }]);

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const newQuestions = [...questions];
        newQuestions[index][name] = value;
        setQuestions(newQuestions);
    };

    const handleAddQuestion = () => {
        if (questions.length < 15) {
            setQuestions([...questions, { question: '', answers: [] }]);
        } else {
            alert('You can add up to 15 questions only.');
        }
    };

    const handleAddAnswer = (questionIndex, newAnswers) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answers = newAnswers;
        setQuestions(newQuestions);
        onAddQuestion(newQuestions);
    };

    const handleSubmitQuestions = (e) => {
        e.preventDefault();
        onAddQuestion(questions);
    };

    return (
        <div>
            <h2>Add Questions</h2>
            <form onSubmit={handleSubmitQuestions}>
                {questions.map((question, index) => (
                    <div key={index}>
                        <label htmlFor={`question${index}`}>Question {index + 1}:</label>
                        <input
                            type="text"
                            id={`question${index}`}
                            name="question"
                            value={question.question}
                            onChange={(e) => handleQuestionChange(index, e)}
                        />
                        <AddAnswer questionIndex={index} onAddAnswer={handleAddAnswer} />
                    </div>
                ))}<br/>
                <button type="button" onClick={handleAddQuestion} className="add-question-button">
                    +Add Question
                </button>
            </form>
        </div>
    );
};

export default AddQuestion;