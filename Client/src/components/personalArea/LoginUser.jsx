import { useState } from "react";
// import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Message } from "primereact/message";
import { Card } from 'primereact/card';
import { Link } from "react-router-dom";
import { loginByPostRequest } from "../../Requests";
import { useUser } from "./UserContext";

export default function LoginUser() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { setCurrentUser } = useUser();

    async function checkAccessPossibility() {
        if (username === "" || password === "") {
            setMessage("Please fill all the fields");
        } else {
            try {
                const res = await loginByPostRequest(username, password);
                console.log(res);
                if (res.status == 200) {
                    setCurrentUser(res.data.user);
                    // console.log(res.data.user.id);
                    navigate(`/${res.data.role}s/${res.data.user.id}`);
                } else {
                    setMessage("Invalid username or password");
                }
            } catch (error) {
                setMessage("catch -Invalid username or password");
            }
        }
    }

    
    async function insertAllRoles(){
        try {
            const response = await fetch(`http://localhost:3000/roles/addAllRoles`, {
                method: "POST",
                body: JSON.stringify(),
                headers: {
                    'Content-type': 'application/json'
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

    async function insertAllManagers(){
        try {
            const response = await fetch(`http://localhost:3000/managers/addManagers`, {
                method: "POST",
                body: JSON.stringify(),
                headers: {
                    'Content-type': 'application/json'
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

    return (
        <>
        
            <Button label="insert roles" onClick={insertAllRoles}/>
            <Button label="insert managers" onClick={insertAllManagers}/>
            <Card title="Login here"
                style={{ width: '50%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <br />
                <FloatLabel>
                    <InputText
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="username">Username</label>
                </FloatLabel>
                <br />
                <br />
                <FloatLabel>
                    <InputText
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                </FloatLabel>
                <br />
                {message && <Message severity="error" text={message} />} <br /> <br />
                <Button label="Log In" onClick={checkAccessPossibility} />
                <br /> <br /> <br />
                <Link to="/register" id="link">
                    Don`t have an account?
                </Link>
                <br />
                <br />
            </Card>
        </>
    );
}
