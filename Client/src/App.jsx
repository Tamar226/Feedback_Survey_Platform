
// /* eslint-disable no-unused-vars */
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import 'primeicons/primeicons.css';
// // import 'primereact/resources/themes/saga-blue/theme.css';  // עיצוב נושא
// import 'primereact/resources/primereact.min.css';          // עיצוב בסיסי של PrimeReact
// import 'primeflex/primeflex.css';                          // Flex utilities של PrimeFlex
// import styled, { createGlobalStyle } from 'styled-components';

// const GlobalStyle = createGlobalStyle`
// @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap');

// body {
//     font-family: 'Ubuntu', sans-serif;
// }
// `;
// import { PrimeReactProvider } from "primereact/api";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import "./App.css";

// import RegisterUser from "./components/personalArea/RegisterUser";
// import LoginUser from "./components/personalArea/LoginUser";
// import Header from "./components/Home page/Header";
// import Footer from "./components/Home page/Footer";
// // import Survey from "./components/SurveysAdding/AddSurvey";
// import { UserProvider } from "./components/personalArea/UserContext";
// import SurveysPage from "./components/surveysView/SurveysPage";
// import SurveyResults from "./components/surveysView/Results/SurveyResults";
// import AboutUs from "./components/Home page/AboutUs";
// import HomePage from "./components/Home page/HomePage";
// import ContactUsPage from "./components/Information/ContactUsPage";
// import ManagerPage from "./components/Home page/ManagerPage";
// export default function App() {
//   return (
//     <UserProvider>
//       <GlobalStyle />
//       <PrimeReactProvider>
//         <Header />
//         <br />
//         <Routes>
//           <Route path="" element={<HomePage />} />
//           <Route path="/AboutUs" element={<AboutUs />} />
//           <Route path="/ContactUs" element={<ContactUsPage />} />

//           <Route path="login" element={<LoginUser />}>
//             {/* <Route path="manager/:id" element={<Login />} />
//               <Route path="user" element={<Login />} /> */}
//           </Route>

//           <Route path="register" element={<RegisterUser />}/>

//           <Route path="surveys" element={<SurveysPage />} />
//           <Route path="surveys/:surveyId/results" element={<SurveyResults />} />

//           <Route path="manager" element={<ManagerPage />}></Route>
//         </Routes>
//         <Footer />
//       </PrimeReactProvider>
//     </UserProvider>
//   );
// }


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
// import Survey from "./components/SurveysAdding/AddSurvey";
import { UserProvider } from './components/personalArea/UserContext';
import SurveysPage from "./components/surveysView/SurveysPage";
import SurveyResults from "./components/surveysView/Results/SurveyResults";
import AboutUs from "./components/Home page/AboutUs";
import HomePage from "./components/Home page/HomePage";
import ContactUsPage from "./components/Information/ContactUsPage";
import ManagerPage from "./components/Home page/ManagerPage";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <PrimeReactProvider>
        <Header />
        <br />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUsPage />} />
          <Route path="login" element={<LoginUser />}>
          </Route>

          <Route path="register" element={<RegisterUser />} />
          <Route path="managers/:id" element={<ManagerPage />} />
          <Route path="users/:id">
            <Route path="surveys" element={<SurveysPage />} />
            <Route path="surveys/:surveyId/results" element={<SurveyResults />} />
          </Route>

        </Routes>
        <Footer />
      </PrimeReactProvider>
    </>
  );
}
