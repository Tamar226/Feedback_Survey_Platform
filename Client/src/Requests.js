export async function getUserDetails(username, password, setworngRequest) {
    try {
        console.log(password);
        const response = await fetch(`http://localhost:3000/managers/login`, {
            method: "POST",
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!response.ok) {
            setworngRequest(true);
            throw new Error("Network response was not ok");
        }
        const promiseData = await response.json();
        console.log("client");
        console.log("promise data " + promiseData);
        let data = promiseData.data;
        console.log("data " + data);
        if (data == null) {
            return { code: 304, message: "NotFound", params: null };
        }
        return { code: 200, message: "ok", params: data };
    }
    catch (error) {
        return { code: 100, message: error, params: null };
    }
}
export async function loginByPostRequest(username, password) {
    try {
        const response = await fetch(`http://localhost:3000/users/login`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const status = response.status;
        const data = await response.json();
        console.log(data);

        if (status === 200) {
            return { status, data };
        } else {
            return { status, data: null };
        }
    } catch (error) {
        return { status: null, data: null };
    }
}

export async function RegisterByPostRequest(reqBody) {
    console.log(reqBody);
    try {
        const response = await fetch(`http://localhost:3000/users/register`, {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        const status = response.status;
        const data = await response.json();
        if (status === 200) {
            return { status, data };
        } else {
            return { status, data: null };
        }
    } catch (error) {
        return { status: null, data: null };
    }
}

export async function fetchSurveys () {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/surveys',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        const status = response.status;
        const data = await response.json();
        if (response.ok) {
            return { status, data };
        }
        else {
            return { status, data: null };
        }
    }catch (error) {
        return { status: null, data: null };
    }
}

export async function fetchSurveyQuestions(surveyId){
    try{
        const response = await fetch(`http://localhost:3000/questions/surveys/${surveyId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
        const status = response.status;
        const data = await response.json();
        if (response.ok) {
            return { status, data };
        }
    else {
            return { status, data: null };
        }
    }catch (error) {
        return { status: null, data: null };
    }
}
export async function fetchSurveyAnswers(questionId) {
    try {
        const response = await fetch(`http://localhost:3000/answers/questions/${questionId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
        const status = response.status;
        const data = await response.json();
        if (response.ok) {
            return { status, data };
        }
        else {
            return { status, data: null };
        }
    } catch (error) {
        return { status: null, data: null };
    }
}
export async function postData(data, setLoading, typeData) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/${typeData}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const status = response.status;
        const promiseData = await response.json();
        console.log(response);
        if (!response.ok) {
            throw new Error("Network error executing the request");
        }
        
        // setLoading ?? setLoading(false);
        console.log('seccsess');
        return { code: status, message: "success post the data", params: promiseData };
    }
    catch (error) {
        // setLoading ?? setLoading(false);
        return { code: 100, message: error, params: null };
    }
}
export async function deleteData(id, typeData) {
    try {
        const response = await fetch(`http://localhost:8080/${typeData}/${id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authentication': `Bearer ${localStorage.getItem('token')}`
            },
        });
        if (!response.ok) {
            throw new Error("Network error executing the request");
        }
        return response;
    }
    catch (error) {
        return false;
    }
}

export const addSurvey = async (survey) => {
    try {
        const response = await fetch('http://localhost:3000/surveys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(survey)
        });
        if (!response.ok) {
            throw new Error('Failed to add survey');
        }
        return response.json();
    } catch (error) {
        console.error('Error adding survey:', error);
        throw error;
    }
};

export const getSurveysBySearch = async (searchText) => {
    try {
        const response = await fetch(`http://localhost:3000/surveys/search?query=${encodeURIComponent(searchText)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to get surveys');
        }
        return response.json();
    } catch (error) {
        console.error('Error getting surveys:', error);
        throw error;
    }
};

export const submitSurveyResults = async (surveyId, answers, userId) => {
    try {
        const response = await fetch(`http://localhost:3000/surveys/${surveyId}/submitResults`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                userId,
                answers,
            }),
        });

        const textResponse = await response.text();
        console.log('Submit response text:', textResponse);

        if (!response.ok) {
            return { success: false, message: 'Failed to submit survey results' };
        }

        return { success: true, message: 'Answers submitted successfully' };
    } catch (error) {
        console.error('Error submitting survey results:', error);
        return { success: false, message: 'Error submitting survey results' };
    }
};


export const fetchSurveyDetails = async (surveyId) => {
    try {
        const response = await fetch(`http://localhost:3000/surveys/${surveyId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log('not json:',response);
        // console.log('json:',await response.json());

        if (!response.ok) {
            throw new Error(`Failed to fetch survey details for survey ID ${surveyId}`);
        }
        
        const data = await response.json();
        return data; // Assuming your backend returns an object with survey and questions properties
    } catch (error) {
        console.error("Error fetching survey details:", error);
        throw error;
    }
};

export const fetchSurveyResults = async (surveyId) => {
    try {
        const response = await fetch(`http://localhost:3000/surveys/${surveyId}/results`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer'+ localStorage.getItem('token')
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch survey results for survey ID ${surveyId}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching survey results:", error);
        throw error;
    }
};

export const getAllUsers = async ()=>{
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/role-relations',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
        const status = response.status;
        const data = await response.json();
        if (response.ok) {
            return { status, data };
        }
        else {
            return { status, data: null };
        }
    }catch (error) {
        return { status: null, data: null };
    }
};

export const updateUserRole= async (username, role)=>{
    try{
        const response = await fetch(`http://localhost:3000/role-relations/${username}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({role})
            });
        const status = response.status;
        const data = await response.json();
        if (response.ok) {
            return { status, data };
        }
        else {
            return { status, data: null };
        }
    }catch (error) {
        return { status: 500, data: null };
    }
}