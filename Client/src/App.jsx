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

import LogIn from "./components/Login";
import Register from "./components/Register";
// import UserDetails from "./components/UserDetails";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="Header" />} />
        <Route path="login" element={<LogIn />} />
        <Route path="register" element={<Outlet />}>
          <Route index element={<Register />} />
          {/* <Route path="userDetails" element={<UserDetails />} /> */}
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
