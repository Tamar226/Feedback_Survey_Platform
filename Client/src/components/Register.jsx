import { useState } from 'react'
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel"
import { Fieldset } from 'primereact/fieldset';
import { Link, useNavigate, Outlet } from "react-router-dom"
import ErrorMessege from '../Messages/ErrorMessage';


export default function Register() {
    const [worngRequest, setworngRequest] = useState(false);
    const navigate = useNavigate();
    const [detailsRegister, setDetailsRegister] = useState({ userName: '', password: '', verifyPassword: '' });
    const handleInputRegisterChange = (e) => {
        const { name, value } = e.target
        setDetailsRegister({
            ...detailsRegister,
            [name]: value
        })
        e.target.classList.remove("notTouch");
    }

    async function register() {
        if (detailsRegister.password != detailsRegister.verifyPassword) {
            alert("Passwords don't match");
        }
        else {
            let userDetails = await getUserDetails(detailsRegister.userName, detailsRegister.password, setworngRequest);
            if (userDetails.code != 100) {
                if (userDetails.code == 304) {
                    let newUserDetails = {
                        username: detailsRegister.userName,
                        website: detailsRegister.password
                    };
                    navigate(`/register/addDetails`, { state: { userDetails: newUserDetails } });
                }
                else {
                    alert("wrong username or password");
                    setDetailsRegister({ userName: '', password: '', verifyPassword: '' })
                }
            }
        }

    }
return (
    <>
    {!worngRequest ?
        <Fieldset legend="Register Here">
             <FloatLabel>
                    <InputText
                        id="name"
                        value={detailsRegister.name}
                        onChange={(e) => handleInputRegisterChange(e)}
                    />
                    <label htmlFor="Name">Name</label>
                </FloatLabel>
                <br /><br />
                <FloatLabel>
                    <InputText
                    id="email"
                    name="email"
                    value={detailsRegister.email}
                    onChange={handleInputRegisterChange}
                    required
                    />
                    <label htmlFor="email">Email</label>
                </FloatLabel>
                <br /><br />
                <FloatLabel>
                    <InputText
                        id="password"
                        value={detailsRegister.password}
                        onChange={(e) => handleInputRegisterChange(e)}
                    />
                    <label htmlFor="password">Password</label>
                </FloatLabel>
                <br />
                <Link to="/AdditionalRegistrationDetails" id="link">
                A little more details about yourself⬇️
                </Link><br /><br />
                <Button onClick={register} label="Registering" />
                <br /><br />
                <Link to="/login" id="link">
                    Already have an acount?
                </Link>
        </Fieldset> :
        <ErrorMessege />}
    </>
)
}



