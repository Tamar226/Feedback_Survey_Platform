import React, { useState } from "react";
// import React, { useContext } from 'react';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Fieldset } from "primereact/fieldset";
import { Link } from "react-router-dom";
import { loginByPostRequest } from "../Requests";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [notValid, setNotValid] = useState(false);
  const [message, setMessage] = useState(false);

  // function checkPassward() {
  //   fetch(`http://localhost:3000/managers?username=${username}`)
  //     .then((res) => res.json())
  //     .then((data) => checkPassWithId(data));
  // }

  // function checkPassWithId() {
  //   // if (managerData.length === 0) {
  //   //   setNotValid(true);
  //   //   return;
  //   // }
  //   fetch(
  //     `http://localhost:3000/managers?id=${managerData[0].id}&password=${password}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.length === 0) {
  //         setNotValid(true);
  //         return;
  //       } else {
  //         localStorage.setItem("currentUser", JSON.stringify(managerData[0]));
  //         window.location.pathname = `/users/${managerData[0].id}`;
  //       }
  //     });
  // }

  function checkAccessPossibility(){
    loginByPostRequest(username, password);
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
        {message && <h3>Invalid username or password</h3>}
      </Fieldset>
    </>
  );
}
