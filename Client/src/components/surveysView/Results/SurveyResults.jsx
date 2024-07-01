// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchSurveyResults } from '../../../Requests';
// import { Chart } from 'primereact/chart';
// import { TreeSelect } from 'primereact/treeselect';
// import './SurveyResultStyle.css';

// const SurveyResults = () => {
//     const { surveyId } = useParams();
//     const [results, setResults] = useState({});
//     const [surveyName, setSurveyName] = useState('');
//     const [selectedChartTypes, setSelectedChartTypes] = useState({});

//     useEffect(() => {
//         const getResults = async () => {
//             try {
//                 const response = await fetchSurveyResults(surveyId);
//                 console.log(response);
//                 setResults(response.questions);
//                 setSurveyName(response.surveyName || 'Survey Results');
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

//         const lineData = {
//             labels,
//             datasets: [{
//                 label: 'Responses',
//                 data,
//                 fill: false,
//                 borderColor: '#42A5F5',
//                 tension: 0.4
//             }]
//         };

//         switch (selectedChartTypes[questionId]) {
//             case 'bar':
//                 return <Chart type="bar" data={barData} />;
//             case 'line':
//                 return <Chart type="line" data={lineData} />;
//             case 'pie':
//             default:
//                 return <Chart type="pie" data={pieData} />;
//         }
//     };

//     const handleChartTypeChange = (questionId, value) => {
//         setSelectedChartTypes((prevState) => ({
//             ...prevState,
//             [questionId]: value
//         }));
//     };

//     const chartTypeOptions = [
//         { key: 'pie', label: 'Pie Chart' },
//         { key: 'bar', label: 'Bar Chart' },
//         { key: 'line', label: 'Line Chart' }
//     ];

//     // Calculate total number of responses and number of unique respondents
//     const totalResponses = Object.values(results).reduce((total, question) => {
//         return total + question.answers.reduce((sum, answer) => sum + answer.count, 0);
//     }, 0);

//     const numberOfQuestions = Object.keys(results).length;
//     const totalRespondents = numberOfQuestions > 0 ? totalResponses / numberOfQuestions : 0;

//     return (
//         <div className="survey-results-container">
//             <h2>{surveyName}</h2>
//             <p>{totalRespondents} respondents</p>
//             {Object.keys(results).map(questionId => (
//                 <div key={questionId} className="question-section">
//                     <h3>{results[questionId].question}</h3>
//                     <TreeSelect
//                         value={selectedChartTypes[questionId]}
//                         onChange={(e) => handleChartTypeChange(questionId, e.value)}
//                         options={chartTypeOptions}
//                         metaKeySelection={false}
//                         className="chart-type-select"
//                         selectionMode="single"
//                         placeholder="Select Chart Type"
//                     />
//                     {renderChart(questionId, results[questionId].answers)}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default SurveyResults;
import React, { useEffect, useState , useRef} from 'react';
import { useParams } from 'react-router-dom';
import { fetchSurveyResults } from '../../../Requests';
import { Chart } from 'primereact/chart';
import { TreeSelect } from 'primereact/treeselect';
import './SurveyResultStyle.css';
import html2canvas from 'html2canvas';
import ReactDOMServer from 'react-dom/server';

import jsPDF from 'jspdf';

const SurveyResults = () => {
    const resultsRef = useRef(null);

    const { surveyId } = useParams();
    const [results, setResults] = useState({});
    const [surveyName, setSurveyName] = useState('');
    const [selectedChartTypes, setSelectedChartTypes] = useState({});
    const [pdfData, setPdfData] = useState([]);

    useEffect(() => {
        const getResults = async () => {
            try {
                const response = await fetchSurveyResults(surveyId);
                console.log(response);
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

        const lineData = {
            labels,
            datasets: [{
                label: 'Responses',
                data,
                fill: false,
                borderColor: '#42A5F5',
                tension: 0.4
            }]
        };

        switch (selectedChartTypes[questionId]) {
            case 'bar':
                return <Chart className='chartSize' type="bar" data={barData} />;
            case 'line':
                return <Chart className='chartSize' type="line" data={lineData} />;
            case 'pie':
            default:
                return <Chart className='chartSize' type="pie" data={pieData} />;
        }
    };

    const handleChartTypeChange = (questionId, value) => {
        setSelectedChartTypes(prevState => ({
            ...prevState,
            [questionId]: value
        }));
    };

    const chartTypeOptions = [
        { key: 'pie', label: 'Pie Chart' },
        { key: 'bar', label: 'Bar Chart' },
        { key: 'line', label: 'Line Chart' }
    ];


  const downloadPDF = async () => {
    if (!resultsRef.current) {
      console.error('Results element not found.');
      return;
    }

    try {
      const canvas = await html2canvas(resultsRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('survey_results.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
    // Calculate total number of responses and number of unique respondents
    const totalResponses = Object.values(results).reduce((total, question) => {
        return total + question.answers.reduce((sum, answer) => sum + answer.count, 0);
    }, 0);

    const numberOfQuestions = Object.keys(results).length;
    const totalRespondents = numberOfQuestions > 0 ? totalResponses / numberOfQuestions : 0;

    return (
        <div className="survey-results-container"  ref={resultsRef}>
            <h2>{surveyName}</h2>
            <p>{totalRespondents} respondents</p>
            {Object.keys(results).map(questionId => (
                <div key={questionId} className="question-section">
                    <h3>{results[questionId].question}</h3>
                    <TreeSelect
                        value={selectedChartTypes[questionId]}
                        onChange={e => handleChartTypeChange(questionId, e.value)}
                        options={chartTypeOptions}
                        metaKeySelection={false}
                        className="chart-type-select"
                        selectionMode="single"
                        placeholder="Select Chart Type"
                    />
                    {renderChart(questionId, results[questionId].answers)}
                </div>
            ))}
            <button onClick={downloadPDF}>Download PDF</button>
        </div>
    );
};

export default SurveyResults;




