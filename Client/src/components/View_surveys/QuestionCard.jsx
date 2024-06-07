import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const QuestionCard = ({ question, onSelect }) => {
    console.log('QuestionCard');
    console.log(question.question);
    return (
        <Card title={question.question}>
           
        </Card>
    );
};

export default QuestionCard;
