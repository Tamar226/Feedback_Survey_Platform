// import React,{useState,useEffect} from 'react';
// import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';
// import Answers from './Answers';
// import { fetchSurveyAnswers } from '../../Requests';

// const QuestionCard = ({ question, onSelect }) => {
//     // console.log('QuestionCard');
//     // console.log(question.question);
//     const [answers, setAnswers] = useState([]);

//     useEffect(() => {
//     const getAnswers = async () => {
//         try {
//             const result = await fetchSurveyAnswers(question.id);
//             if (result.status === 200 && result.data) {
//                 setAnswers(result.data);
//             } else {
//                 console.error("Failed to fetch answers");
//             }
//         } catch (error) {
//             console.error('Error fetching answers:', error);
//         }
//     };
//     if (question) {
//         getAnswers();
//     }
//     },[question]);
// return (
//     <Card title={question.question}>
//         <Answers
//             questionId={question.id}
//             answers={answers}
//             onAnswerChange={handleAnswerChange}
//             selectedAnswer={selectedAnswers[question.id]}
//         />
//     </Card>
// );
// };

// export default QuestionCard;
import React,{useState,useEffect} from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Answers from './Answers';
import { fetchSurveyAnswers } from '../../Requests';

const QuestionCard = ({ question, onAnswerChange, selectedAnswer }) => {
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const getAnswers = async () => {
            try {
                const result = await fetchSurveyAnswers(question.id);
                if (result.status === 200 && result.data) {
                    setAnswers(result.data);
                } else {
                    console.error("Failed to fetch answers");
                }
            } catch (error) {
                console.error('Error fetching answers:', error);
            }
        };
        if (question) {
            getAnswers();
        }
    }, [question]);

    return (
        <Card title={question.question}>
            <Answers
                questionId={question.id}
                answers={answers}
                onAnswerChange={onAnswerChange}
                selectedAnswer={selectedAnswer}
            />
        </Card>
    );
};

export default QuestionCard;
