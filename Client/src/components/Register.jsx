import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Fieldset } from "primereact/fieldset";
import { Link, useNavigate, Outlet } from "react-router-dom";
import ErrorMessege from "../Messages/ErrorMessage";

// import { getUserDetails } from '';

export default function Register() {
  const [worngRequest, setworngRequest] = useState(false);
  const [message, setMessage] = useState("");
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
    } else {
      setMessage("");
    }
  };
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  async function register() {
    if (
      detailsRegister.userName == "" ||
      detailsRegister.password == "" ||
      detailsRegister.verifyPassword == ""
    ) {
      setMessage("Please fill all the fields");
    }
    if (detailsRegister.password != detailsRegister.verifyPassword) {
      setMessage("Passwords don't match");
    } else {
      let userDetails = await getUserDetails(
        detailsRegister.userName,
        detailsRegister.password,
        setworngRequest
      );
      if (userDetails.code != 100) {
        if (userDetails.code == 304) {
          let newUserDetails = {
            username: detailsRegister.userName,
            website: detailsRegister.password,
          };
          navigate(`/register/addDetails`, {
            state: { userDetails: newUserDetails },
          });
        } else {
          setMessage("wrong username or password");
          setDetailsRegister({
            name: "",
            userName: "",
            email: "",
            password: "",
            company: "",
          });
        }
      }
    }
  }
  return (
    <>
      {!worngRequest ? (
        <Fieldset legend="Register Here">
          {message && <p style={{ color: "orange" }}>{message}</p>}
          <FloatLabel>
            <InputText
              id="name"
              value={detailsRegister.name}
              onChange={(e) => handleInputRegisterChange(e)}
            />
            <label htmlFor="Name">Name</label>
          </FloatLabel>
          <br />
          <br />
          <FloatLabel>
            <InputText
              id="username"
              value={detailsRegister.username}
              onChange={(e) => handleInputRegisterChange(e)}
            />
            <label htmlFor="username">User-Name</label>
          </FloatLabel>
          <br />
          <br />
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
          <br />
          <br />
          <FloatLabel>
            <InputText
              id="password"
              value={detailsRegister.password}
              onChange={(e) => handleInputRegisterChange(e)}
            />
            <label htmlFor="password">Password</label>
          </FloatLabel>
          <br /> <br />
          <FloatLabel>
            <InputText
              id="company"
              value={detailsRegister.company}
              onChange={(e) => handleInputRegisterChange(e)}
            />
            <label htmlFor="company">Company</label>
          </FloatLabel>
          <br />
          <Button onClick={register} label="Registering" />
          <br /><br />
          <Link to="/login" id="link">
            Already have an acount?
          </Link>
        </Fieldset>
      ) : (
        <ErrorMessege />
      )}
    </>
  );
}
