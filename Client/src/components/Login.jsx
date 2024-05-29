import { useState } from "react";
// import React, { useContext } from 'react';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Fieldset } from "primereact/fieldset";
import { Message } from "primereact/message";
import { Link } from "react-router-dom";
import { loginByPostRequest } from "../Requests";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function checkAccessPossibility() {
    if (username === "" || password === "") {
      setMessage("Please fill all the fields");
    } else {
      try {
        const res = await loginByPostRequest(username, password);
        console.log(res);
        if (res.status === 200) {
          window.location.pathname = `/managers/${res.data.manager.id}`;
        } else {
          setMessage("Invalid username or password");
        }
      } catch (error) {
        setMessage("Invalid username or password");
      }
    }
  }

  return (
    <>
      <Fieldset legend="Login here">
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
        <br />
        <Button label="Log In" onClick={checkAccessPossibility} />
        <br /> <br /> <br />
        <Link to="/register" id="link">
          Don`t have an account?
        </Link>
        <br />
        <br />
        {message && (
          <Message severity="error" text={message} />
        )}
      </Fieldset>
    </>
  );
}
