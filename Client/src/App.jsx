
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

import Register from "./components/personalArea/Register";
import Login from "./components/personalArea/Login";
import Header from "./components/Home page/Header";
import Footer from "./components/Home page/Footer";
import Survey from "./components/surveysAdding/AddSurvey";
import { UserProvider } from "./components/personalArea/UserContext"; 
import SurveysPage from "./components/surveysView/SurveysPage";

export default function App() {
  return (
    <UserProvider>
      <PrimeReactProvider>
          <Header />
          <br />
          <Routes>
            <Route path="login" element={<Login />}>
              <Route path="manager/:id" element={<Login />} />
              <Route path="user" element={<Login />} />
            </Route>
            <Route path="register" element={<Register />}>
              <Route path="manager" element={<Register />} />
              <Route path="user" element={<Register />} />
            </Route>
            {/* <Route path="surveys" element={<SurveysPage/>}> */}
            <Route path="surveys" element={<SurveysPage/>}>


            </Route>
            {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          </Routes>
          <Footer />
      </PrimeReactProvider>
    </UserProvider>
  );
}


