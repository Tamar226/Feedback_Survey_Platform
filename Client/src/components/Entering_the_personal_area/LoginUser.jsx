import { useState } from "react";
// import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Message } from "primereact/message";
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
                    console.log(res.data.user.id);
                    navigate(`/user/${res.data.user.id}`);
                } else {
                    setMessage("Invalid username or password");
                }
            } catch (error) {
                setMessage("catch -Invalid username or password");
            }
        }
    }

    return (
        <>
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
        </>
    );
}
