import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Message } from 'primereact/message';
import { SelectButton } from 'primereact/selectbutton';
import { Password } from 'primereact/password';
import { InputNumber } from "primereact/inputnumber";
import { Card } from 'primereact/card';
import { Link, useNavigate } from "react-router-dom";
import 'primeicons/primeicons.css';
import { RegisterByPostRequest } from '../../Requests';
import { useUser } from './UserContext';

export default function Register() {
    const [message, setMessage] = useState("");
    const { setCurrentUser, currentUser } = useUser();
    const genders = ['male', 'female'];
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const [detailsRegister, setDetailsRegister] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        city: "",
        age: 18,
        gender: "male",
        job: "",
        company: "",
        profileImage: null,
    });

    const handleInputRegisterChange = (e) => {
        const { name, value } = e.target;
        setDetailsRegister((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleInputNumberChange = (e) => {
        setDetailsRegister((prevDetails) => ({
            ...prevDetails,
            age: e.value,
        }));
    };

    const handleEmailBlur = (e) => {
        const { value } = e.target;
        if (value && !validateEmail(value)) {
            setMessage("Invalid email address");
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file.type !== "image/png") {
            alert('Please select a image file');
            return;
        }
        setSelectedImage(file);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (detailsRegister.username === "" || detailsRegister.password === "") {
            setMessage("Please fill all the fields");
            return;
        }
        if (!validateEmail(detailsRegister.email)) {
            setMessage("Please check your email address");
            return false;
        }
        checkAccessPossibility();
    }

    async function checkAccessPossibility() {
        if (detailsRegister.username === "" || detailsRegister.password === "") {
            setMessage("Please fill all the fields");
            return;
        }
        if (message === "Invalid email address") {
            setMessage("Please check your email address");
            return;
        }

        let formData = new FormData();
        formData.append('Image', selectedImage);
        for (const key in detailsRegister) {
            formData.append(key, detailsRegister[key]);
        }
        // Convert FormData to JSON
        const formDataJson = {};
        formData.forEach((value, key) => {
            formDataJson[key] = value;
        });

        // Debugging output
        console.log('formDataJson:', formDataJson);
        const res = await RegisterByPostRequest(formDataJson);
        console.log('resdata:', res.data);
        if (res.status === 200) {
            const user = Object.values(res.data)[0];
            const token = res.data.token;
            sessionStorage.setItem('token', token);
            setCurrentUser(user);
            navigate(`/users/${user.id}`);
        } else if (res.code !== 100) {
            if (res.code === 304) {
                setMessage("User already exists");
            } else {
                setMessage(res.message);
            }
            setDetailsRegister({
                name: "",
                username: "",
                email: "",
                password: "",
                city: "",
                age: 18,
                gender: "male",
                job: "",
                company: "",
                profileImage: null,
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
                <br />
                {/* <input type="file" accept="image/jpeg, image/png, image/gif, image/jpg" onChange={(e) => handleFileChange(e)} onError={(e) => console.error('Error selecting file:', e)} /> */}
                <input id="file-upload" type="file" accept="image/jpeg, image/png, image/gif" onChange={handleFileChange} name="image" />
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
