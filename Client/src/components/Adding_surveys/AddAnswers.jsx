import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const AddAnswers = ({ onAddAnswer }) => {
    const [answer, setAnswer] = useState('');

    const handleAddAnswer = () => {
        onAddAnswer(answer);
        setAnswer('');
    };

    return (
        <div className="p-field">
            <label htmlFor="answer">Answer</label>
            <InputText id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
            <Button label="Add Answer" icon="pi pi-plus" onClick={handleAddAnswer} className="p-ml-2" />
        </div>
    );
};

export default AddAnswers;
