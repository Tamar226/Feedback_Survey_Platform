// import { useMemo, useState } from 'react'
// import { Link, useNavigate } from "react-router-dom"
// // import { getUserDetails } from '../Requests';
// import ErrorMessege from '../Messages/ErrorMessage';
// import LoadingMessage from '../Messages/LoadingMessage';

// export default function LogIn() {
//   const navigate = useNavigate();
//   const [worngRequest, setworngRequest] = useState(false);
//   const [detailsLogIn, setDetailsLogIn] = useState({ userName: '', password: '' });
//   const handleLogInInputChange = (e) => {
//     const { name, value } = e.target
//     setDetailsLogIn({
//       ...detailsLogIn,
//       [name]: value
//     })
//     if (e.target.value != "")
//       e.target.classList.remove("notTouch");
//   }

//   async function logInUser() {
//     let userDetails = await getUserDetails(detailsLogIn.userName, detailsLogIn.password, setworngRequest);
//     if (userDetails.code != 100) {
//       if (userDetails.code == 304) {
//         setDetailsLogIn({ userName: '', password: '' })
//         alert("Incorrect Details");
//       }
//       else {
//         let id = userDetails.params.id;
//         localStorage.setItem("currentUser", JSON.stringify(userDetails.params));
//         navigate(`/users/${id}/home`);
//       }
//     }
//   }

//   return (
//     <>
//       {!worngRequest ?
//         <div style={{ height: "90vh", marginTop: "30vh" }}>

//           <div>
//             <h2>Log In</h2>
//             <form onSubmit={(e) => { e.preventDefault(); logInUser(); }}>
//               <label htmlFor="userName">User Name</label><br />
//               <input id="userName" type='text' className='notTouch' value={detailsLogIn.userName} name='userName' pattern="[a-zA-Z\u0590-\u05FF\s]+"  onChange={(e) => handleLogInInputChange(e)} /><br />
//               <label htmlFor="password">Password</label><br />
//               <input id="password" type='password' className='notTouch' value={detailsLogIn.password} name='password' autoComplete='2' required onChange={(e) => handleLogInInputChange(e)} /><br /><br />
//               <button type="submit" style={{ backgroundColor: "rgb(67, 148, 162)", color: 'white' }}>Log In</button><br /><br />
//             </form>
//             <div id="divbut">
//               <h4>Dont have an account?</h4>
//               <Link id="linkReg" to="/register">
//                 Register
//               </Link>
//             </div>
//           </div>
//         </div> : <ErrorMessege setworngRequest={setworngRequest} />
//       }
//     </>
//   )
// }

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import {FloatLabel} from "primereact/floatlabel"
import { Fieldset } from 'primereact/fieldset';
// import "./login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notValid, setNotValid] = useState(false);

  function checkPassward() {
    fetch(`http://localhost:3305/users?username=${username}`)
      .then((res) => res.json())
      .then((data) => checkPassWithId(data));
  }

  function checkPassWithId(userData) {
    if (userData.length === 0) {
      setNotValid(true);
      return;
    }
    fetch(
      `http://localhost:3305/passwords?userID=${userData[0].id}&password=${password}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setNotValid(true);
          return;
        } else {
          localStorage.setItem("currentUser", JSON.stringify(userData[0]));
          window.location.pathname = `/users/${userData[0].id}`;
        }
      });
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
        <br /><br />
        <FloatLabel>
          <InputText
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </FloatLabel>
        <br /><br />
        <Button onClick={checkPassward} label="Log In" />
        <br /> <br /> <br />
        <Link to="/register" id="link">
          Don`t have an account?
        </Link>
        {notValid && <h3>Invalid username or password</h3>}
      </Fieldset>
    </>
  );
}
module.exports ="Login"