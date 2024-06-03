/**FIXME:
 * לדאוג שיחזור אותו דבר בכניסה חדשה ובהתחברות של משתמש קיים
 */

import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Fieldset } from "primereact/fieldset";
import { Message } from 'primereact/message';
import { Link, useNavigate } from "react-router-dom";
import { RegisterByPostRequest } from '../Requests';
import { useUser } from './UserContext';  //
export default function Register() {
  const [worngRequest, setworngRequest] = useState(false);
  const [message, setMessage] = useState("");
  const { setCurrentUser } = useUser();
  const { login } = useUser();
  const navigate = useNavigate();
  const [detailsRegister, setDetailsRegister] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    company: "",
  });

  const handleInputRegisterChange = (e) => {
    const { name, value } = e.target;
    setDetailsRegister({
      ...detailsRegister,
      [name]: value,
    });
    e.target.classList.remove("notTouch");
  };

  const handleEmailBlur = (e) => {
    const { value } = e.target;
    if (!validateEmail(value)) {
      setMessage("Invalid email address");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  async function checkAccessPossibility() {
    if (detailsRegister.userName === "" || detailsRegister.password === "") {
      setMessage("Please fill all the fields");
      return;
    }
    if (message=="Invalid email address"){//??
      setMessage("please check your email address");//???
      return;
    }
    const res = await RegisterByPostRequest(detailsRegister.name, detailsRegister.userName, detailsRegister.email, detailsRegister.password, detailsRegister.company);
    console.log(res);
    if (res.status==200){
      setCurrentUser(res.data[0]); 
      login(res.data[0]);
      navigate(`/managers/${res.data[0].id}`);
    }
    if (res.code !== 100) {
      if (res.code === 304) {
        setMessage("User already exists");
      } else {
        setMessage("Wrong username or password");
      }
      setDetailsRegister({
        name: "",
        userName: "",
        email: "",
        password: "",
        company: "",
      });
    }
  }

  return (
    <>
      <Fieldset legend="Register Here">
        <FloatLabel>
          <InputText
            id="name"
            name="name"
            value={detailsRegister.name}
            onChange={handleInputRegisterChange}
          />
          <label htmlFor="name">Name</label>
        </FloatLabel>
        <br /><br />
        <FloatLabel>
          <InputText
            id="userName"
            name="userName"
            value={detailsRegister.userName}
            onChange={handleInputRegisterChange}
          />
          <label htmlFor="userName">User-Name</label>
        </FloatLabel>
        <br /> <br />
        <FloatLabel>
          <InputText
            id="email"
            name="email"
            value={detailsRegister.email}
            onChange={handleInputRegisterChange}
            onBlur={handleEmailBlur}
            required
          />
          <label htmlFor="email">Email</label>
        </FloatLabel>
        <br /><br />
        <FloatLabel>
          <InputText
            id="password"
            name="password"
            value={detailsRegister.password}
            onChange={handleInputRegisterChange}
          />
          <label htmlFor="password">Password</label>
        </FloatLabel>
        <br /><br />
        <FloatLabel>
          <InputText
            id="company"
            name="company"
            value={detailsRegister.company}
            onChange={handleInputRegisterChange}
          />
          <label htmlFor="company">Company</label>
        </FloatLabel>
        <br />
      {message &&( <Message severity="error" text={message} />)}<br/><br/>
        <Button onClick={checkAccessPossibility} label="Registering" />
        <br /><br />
        <Link to="/login" id="link">
          Already have an account?
        </Link>
      </Fieldset>
    </>
  );
}

