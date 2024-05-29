/* eslint-disable no-unused-vars */
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import {
  Routes,
  Route,
  NavLink,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Register from "./components/Register";
import Login from "./components/Login";
import AdditionalRegistrationDetails from "./components/AdditionalRegistrationDetails";
// import UserDetails from "./components/UserDetails";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="login" element={<Login />}>
          <Route path="manager/:id" element={<Login />} />
          <Route path="user" element={<Login />} />
        </Route>
        <Route path="register" element={<Register />}>
          <Route
            path="moreDetails"
            element={<AdditionalRegistrationDetails />}
          />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
