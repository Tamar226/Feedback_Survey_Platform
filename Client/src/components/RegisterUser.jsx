/**FIXME:
 * לדאוג שיחזור אותו דבר בכניסה חדשה ובהתחברות של משתמש קיים
 */

import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Fieldset } from "primereact/fieldset";
import { Message } from 'primereact/message';
import { RadioButton } from 'primereact/radiobutton';
import { SelectButton } from 'primereact/selectbutton';
import { Link, useNavigate } from "react-router-dom";
import { RegisterByPostRequest } from '../Requests';
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
        age: "",
        gender: "",
        job: "",
    });
    const ages = [
        { name: ' 0 - 18', key: '0' },
        { name: ' 18 - 24', key: '18' },
        { name: ' 25 - 40', key: '25' },
        { name: ' 41 - 70', key: '41' },
        { name: ' 71 - 120', key: '71' },
    ];
    const [selectedAge, setSelectedAge] = useState(ages[0]);
    const genders = ['male', 'female'];
    const [gender, setGender] = useState(genders[0]);

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
        if (detailsRegister.username === "" || detailsRegister.password === "") {
            setMessage("Please fill all the fields");
            return;
        }
        if (message == "Invalid email address") {//??
            setMessage("please check your email address");//???
            return;
        }
        const res = await RegisterByPostRequest(detailsRegister.name, detailsRegister.username, detailsRegister.email, detailsRegister.password, detailsRegister.city, detailsRegister.age, detailsRegister.gender, detailsRegister.job);
        console.log(res);
        if (res.status == 200) {
            setCurrentUser(res.data[0]);
            login(res.data[0]);
            navigate(`/users/${res.data[0].id}`);
        }
        if (res.code !== 100) {
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
                gender: "",
                job: "",
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
                    <InputText
                        id="password"
                        name="password"
                        value={detailsRegister.password}
                        onChange={handleInputRegisterChange}
                    />
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
                <br />
                <p>Age:</p>
                {ages.map((age) =>{
                    return (
                        <div key={age.key} className="flexalign-items-center">
                            <RadioButton inputId={age.key} name="age" value={age}
                            onChange={(e) => setSelectedAge(e.value)} 
                            checked={selectedAge.key === age.key}/>
                            <label htmlFor={age.key} className="ml-2">{age.name}</label>
                            <br /><br />
                        </div>
                    );
                })}
                <br />
                <SelectButton value={gender} 
                onChange={(e)=> setGender(e.value)} options={genders}/>
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
                {message && (<Message severity="error" text={message} />)}<br /><br />
                <Button onClick={checkAccessPossibility} label="Registering" />
                <br /><br />
                <Link to="/login" id="link">
                    Already have an account?
                </Link>
            </Fieldset>
        </>
    );
}

