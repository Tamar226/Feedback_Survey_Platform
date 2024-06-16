// /* eslint-disable no-unused-vars */
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
// import {
//   Routes,
//   Route,
//   NavLink,
//   Link,
//   Outlet,
//   Navigate,
// } from "react-router-dom";
// import "./App.css";

// import Register from "./components/Register";
// import Login from "./components/Login";
// import AdditionalRegistrationDetails from "./components/AdditionalRegistrationDetails";
// // import UserDetails from "./components/UserDetails";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// // import NotFound from "./components/NotFound";

// function App() {
//   return (
//     <>
//       <Header />
//       <br />
//       <Routes>
//         <Route path="login" element={<Login />}>
//           <Route path="manager/:id" element={<Login />} />
//           <Route path="user" element={<Login />} />
//         </Route>
//         <Route path="register" element={<Register />}>
//           <Route path="manager" element={<Register />} />
//           <Route path="user" element={<Register />} />
//         </Route>
    
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// export default App;


/* eslint-disable no-unused-vars */
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider } from "primereact/api";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Register from "./components/Entering_the_personal_area/Register";
import Login from "./components/Entering_the_personal_area/Login";
import Header from "./components/Home page/Header";
import Footer from "./components/Home page/Footer";
import Survey from "./components/Adding_surveys/AddSurvey";
import { UserProvider } from "./components/Entering_the_personal_area/UserContext"; 
import SurveysPage from "./components/View_surveys/SurveysPage";

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


