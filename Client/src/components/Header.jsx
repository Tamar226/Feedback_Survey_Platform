
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

import 'primeicons/primeicons.css';
import { PrimeIcons } from 'primereact/api';
import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { NavLink } from "react-router-dom"
// import { ColorPicker } from 'primereact/colorpicker';
export default function Header() {
    function logout() {
                localStorage.removeItem("currentUser");
            }
            
            function login() {
                localStorage.setItem("currentUser", "true");
                if (localStorage.getItem("currentUser") === "true") {
                    return (
                        <>
        
                        </>
                    );
                }
            }
    const items = [
        { label: 'About Us', icon: PrimeIcons.SLACK, url: '/AboutUs'},
        { label: 'Contact Us', icon: PrimeIcons.PHONE, url: '/ContactUs' },
        { label: 'Surveys', icon: PrimeIcons.WAVE_PULSE, url: '/Surveys' },
        { label: 'Login', icon: PrimeIcons.USERS, url: '/login', onClick: login },
        { label: 'Logout', icon: 'pi pi-sign-out', url: '/logout', onClick: logout }
    ];

    return (
        <div className="card" >
            <TabMenu model={items.map(item => ({ label: <NavLink style={{height:"3rem"}} className="navLink" onClick={item.onClick}>{item.label}</NavLink>, icon: item.icon, command: () => window.location.href = item.url }))} />
        
        </div>
    )
}

