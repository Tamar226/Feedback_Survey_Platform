
/* eslint-disable no-unused-vars */
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from "primereact/api";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import RegisterUser from "./components/Entering_the_personal_area/RegisterUser";
import LoginUser from "./components/Entering_the_personal_area/LoginUser";
import Header from "./components/Home page/Header";
import Footer from "./components/Home page/Footer";
import Survey from "./components/Adding_surveys/Survey";
import { UserProvider } from "./components/Entering_the_personal_area/UserContext";
import SurveysPage from "./components/View_surveys/SurveysPage";
import ManagerPage from "./components/Home page/ManagerPage";

export default function App() {
  return (
    <UserProvider>
      <PrimeReactProvider>
        <Header />
        <br />
        <Routes>
          <Route path="login" element={<LoginUser />}>
            {/* <Route path="manager/:id" element={<Login />} />
              <Route path="user" element={<Login />} /> */}
          </Route>
          <Route path="register" element={<RegisterUser />}>
          </Route>
          <Route path="surveys" element={<SurveysPage />}>
          </Route>
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path="manager/:id" element={<ManagerPage />} />
        </Routes>
        <Footer />
      </PrimeReactProvider>
    </UserProvider>
  );
}


