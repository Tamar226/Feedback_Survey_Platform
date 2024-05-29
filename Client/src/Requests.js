export async function getUserDetails(username, password, setworngRequest) {
    try {
        console.log(password);
        const response = await fetch(`http://localhost:3000/managers/login`, {
            method: "POST",
            body: JSON.stringify({ username: username, password: password }),
            headers: {
                'Content-type': 'application/json'
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
        debugger;
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
    const response = await fetch(`http://localhost:3000/managers/login`, {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: {
            'Content-type': 'application/json'
        },
    });
    if (!response.ok) {
        return false;
    }
    const promiseData = await response.json();
    console.log(promiseData);
}