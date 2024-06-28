import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Message } from 'primereact/message';
import { SelectButton } from 'primereact/selectbutton';
import { Password } from 'primereact/password';
import { InputNumber } from 'primereact/inputnumber';
import { Card } from 'primereact/card';
import 'primeicons/primeicons.css';
import { Link, useNavigate } from "react-router-dom";
import { RegisterByPostRequest } from '../../Requests';
import { useUser } from './UserContext';

export default function Register() {
    const [message, setMessage] = useState("");
    const { setCurrentUser } = useUser();
    const { login } = useUser();
    const navigate = useNavigate();
    const [detailsRegister, setDetailsRegister] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        city: "",
        age: 18, // Change default to a number
        gender: "male",
        job: "",
        company: "",
    });
    const genders = ['male', 'female'];

    const handleInputRegisterChange = (e) => {
        const { name, value } = e.target;
        setDetailsRegister((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleInputNumberChange = (e) => {
        const { name, value } = e;
        setDetailsRegister((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
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
        if (detailsRegister.username === "" || detailsRegister.password === "") {
            setMessage("Please fill all the fields");
            return;
        }
        if (message === "Invalid email address") {
            setMessage("Please check your email address");
            return;
        }
        const res = await RegisterByPostRequest(detailsRegister);
        console.log(res);
        if (res.status === 200) {
            setCurrentUser(res.data[0]);
            login(res.data[0]);
            navigate(`/users/${res.data[0].id}`);
        } else if (res.code !== 100) {
            if (res.code === 304) {
                setMessage("User already exists");
            } else {
                setMessage("Wrong username or password");
            }
            setDetailsRegister({
                name: "",
                username: "",
                email: "",
                password: "",
                city: "",
                age: "",
                gender: "male",
                job: "",
                company: "",
            });
        }
    }

    return (
        <>
            <Card title="Register here" 
            style={{ width: '50%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FloatLabel>
                    <InputText
                        id="name"
                        name="name"
                        value={detailsRegister.name}
                        onChange={handleInputRegisterChange}
                    />
                    <label htmlFor="name">Name</label>
                </FloatLabel>
                <br />
                <FloatLabel>
                    <InputText
                        id="username"
                        name="username"
                        value={detailsRegister.username}
                        onChange={handleInputRegisterChange}
                    />
                    <label htmlFor="username">User-Name</label>
                </FloatLabel>
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
                <FloatLabel>
                    <Password
                        inputId="password" name="password"
                        value={detailsRegister.password}
                        onChange={handleInputRegisterChange} />
                    <label htmlFor="password">Password</label>
                </FloatLabel>
                <br />
                <FloatLabel>
                    <InputText
                        id="city"
                        name="city"
                        value={detailsRegister.city}
                        onChange={handleInputRegisterChange}
                    />
                    <label htmlFor="city">City</label>
                </FloatLabel>
                <p>Age:</p>
                <InputNumber
                    value={detailsRegister.age}
                    name="age"
                    onValueChange={handleInputNumberChange}
                    mode="decimal"
                    showButtons
                    min={0}
                    max={120}
                />
                <br /><br />
                <SelectButton
                    value={detailsRegister.gender}
                    onChange={(e) => setDetailsRegister({
                        ...detailsRegister,
                        gender: e.value
                    })}
                    options={genders}
                />
                <br />
                <FloatLabel>
                    <InputText
                        id="job"
                        name="job"
                        value={detailsRegister.job}
                        onChange={handleInputRegisterChange}
                    />
                    <label htmlFor="job">Job</label>
                </FloatLabel>
                <br />
                <FloatLabel>
                    <InputText
                        id="company"
                        name="company"
                        value={detailsRegister.company}
                        onChange={handleInputRegisterChange}
                    />
                    <label htmlFor="company">Company</label>
                </FloatLabel>
                {message && (<Message severity="error" text={message} />)}<br /><br />
                <Button onClick={checkAccessPossibility} label="Register" />
                <br /><br />
                <Link to="/login" id="link">
                    Already have an account?
                </Link>
            </Card>
        </>
    );
}