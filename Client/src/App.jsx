import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body {
    font-family: 'Ubuntu', sans-serif;
}
`;
import { PrimeReactProvider } from "primereact/api";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import "./App.css";

import RegisterUser from "./components/personalArea/RegisterUser";
import LoginUser from "./components/personalArea/LoginUser";
import Header from "./components/Home page/Header";
import Footer from "./components/Home page/Footer";
import { UserProvider } from "./components/personalArea/UserContext";
import SurveysPage from "./components/surveysView/SurveysPage";
import SurveyResults from "./components/surveysView/Results/SurveyResults";
import AboutUs from "./components/Home page/AboutUs";
import HomePage from "./components/Home page/HomePage";
import ContactUsPage from "./components/Information/ContactUsPage";
import ManagerPage from "./components/Home page/ManagerPage";
import { useUser } from "./components/personalArea/UserContext";
import { useState, useEffect } from "react";
import Profile from "./components/Home page/Profile";
import { Button } from "primereact/button";

export default function App() {
    const { currentUser } = useUser();
    const [userName, setUserName] = useState('');
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setUserName(currentUser.username);
        } else {
            setUserName('');
        }
    }, [currentUser]);
    const onClose = () => {
        setShowProfile(false);
    }
    return (
        <UserProvider>
            <GlobalStyle />
            <PrimeReactProvider>
                <Header />
                
                {showProfile && <div className='profileDiv'><Profile onClose={onClose} /></div>}
                <div class="marquee-container"><Button className="buttonProfile" onClick={() => setShowProfile(true)} icon="pi pi-user" label="My Pofile"  />
                    <div class="marquee-text"> New on the platform!! Surveys on tourism and economy! Come see...  --------------          
                                               Recommendations about us from well-known companies in the world!!</div>
                </div>
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="/AboutUs" element={<AboutUs />} />
                    <Route path="/ContactUs" element={<ContactUsPage />} />
                    <Route path="login" element={<LoginUser />}>

                    </Route>
                    <Route path="users/:id">
                        <Route path="" element={<HomePage />} />
                        <Route path="surveys/:surveyId/results" element={<SurveyResults />} />
                        <Route path="surveys" element={<SurveysPage />} />
                    </Route>
                    <Route path="register" element={<RegisterUser />} />
                    <Route path="managers/:id" element={<ManagerPage />}></Route>
                </Routes>
                <Footer />
            </PrimeReactProvider>
        </UserProvider>
    );
}
