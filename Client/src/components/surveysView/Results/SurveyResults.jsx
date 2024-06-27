// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchSurveyResults } from '../../../Requests';
// import { Chart } from 'primereact/chart';
// import './SurveyResultStyle.css';

// const SurveyResults = () => {
//     const { surveyId } = useParams();
//     const [results, setResults] = useState({});
//     const [surveyName, setSurveyName] = useState('');

//     useEffect(() => {
//         const getResults = async () => {
//             try {
//                 const response = await fetchSurveyResults(surveyId);
//                 console.log('res-client:',response)
//                 setResults(response);
//                 // setSurveyName(response.data.surveyName || 'Survey Results');
//             } catch (error) {
//                 console.error('Error fetching survey results:', error);
//             }
//         };

//         if (surveyId) {
//             getResults();
//         }
//     }, [surveyId]);

//     const renderChart = (questionId, answers) => {
//         const labels = answers.map(answer => answer.answer);
//         const data = answers.map(answer => answer.count);

//         const pieData = {
//             labels,
//             datasets: [{
//                 data,
//                 backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40']
//             }]
//         };

//         const barData = {
//             labels,
//             datasets: [{
//                 label: 'Responses',
//                 data,
//                 backgroundColor: '#42A5F5'
//             }]
//         };

//         return questionId % 2 === 0 ? (
//             <Chart type="bar" data={barData} />
//         ) : (
//             <Chart type="pie" data={pieData} />
//         );
//     };

//     return (
//         <div className="survey-results-container">
//             <h2>{surveyName}</h2>
//             {Object.keys(results).map(questionId => (
//                 <div key={questionId} className="question-section">
//                     <h3>{results[questionId].question}</h3>
//                     {renderChart(questionId, results[questionId].answers)}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default SurveyResults;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSurveyResults } from '../../../Requests';
import { Chart } from 'primereact/chart';
import './SurveyResultStyle.css';

const SurveyResults = () => {
    const { surveyId } = useParams();
    const [results, setResults] = useState({});
    const [surveyName, setSurveyName] = useState('');
    const [chartType, setChartType] = useState('pie');

    useEffect(() => {
        const getResults = async () => {
            try {
                const response = await fetchSurveyResults(surveyId);
                console.log(response)
                setResults(response.questions);
                setSurveyName(response.surveyName || 'Survey Results');
            } catch (error) {
                console.error('Error fetching survey results:', error);
            }
        };

        if (surveyId) {
            getResults();
        }
    }, [surveyId]);

    const renderChart = (questionId, answers) => {
        const labels = answers.map(answer => answer.answer);
        const data = answers.map(answer => answer.count);

        const pieData = {
            labels,
            datasets: [{
                data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40']
            }]
        };

        const barData = {
            labels,
            datasets: [{
                label: 'Responses',
                data,
                backgroundColor: '#42A5F5'
            }]
        };

        return chartType === 'pie' ? (
            <Chart type="pie" data={pieData} />
        ) : (
            <Chart type="bar" data={barData} />
        );
    };

    const handleChartTypeChange = (type) => {
        setChartType(type);
    };

    const totalResponses = Object.keys(results).reduce((total, questionId) => {
        return total + results[questionId].answers.reduce((sum, answer) => sum + answer.count, 0);
    }, 0);

    return (
        <div className="survey-results-container">
            <h2>{surveyName}</h2>
            <p>{totalResponses} responses</p>
            <div className="chart-toggle">
                <button
                    className={chartType === 'pie' ? 'active' : ''}
                    onClick={() => handleChartTypeChange('pie')}
                >
                    Pie Chart
                </button>
                <button
                    className={chartType === 'bar' ? 'active' : ''}
                    onClick={() => handleChartTypeChange('bar')}
                >
                    Bar Chart
                </button>
            </div>
            {Object.keys(results).map(questionId => (
                <div key={questionId} className="question-section">
                    <h3>{results[questionId].question}</h3>
                    {renderChart(questionId, results[questionId].answers)}
                </div>
            ))}
        </div>
    );
};

export default SurveyResults;
