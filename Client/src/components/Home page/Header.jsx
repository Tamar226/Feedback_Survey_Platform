
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

import 'primeicons/primeicons.css';
import { PrimeIcons } from 'primereact/api';
import React from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { NavLink } from "react-router-dom"
// import { ColorPicker } from 'primereact/colorpicker';
import { useUser } from '../personalArea/UserContext';
export default function Header() {
    const { currentUser, login, logout } = useUser();
    console.log(currentUser);
    const items = [
        { label: 'About Us', icon: PrimeIcons.SLACK, url: '/AboutUs' },
        { label: 'Contact Us', icon: PrimeIcons.PHONE, url: '/ContactUs' },
        { label: 'Surveys', icon: PrimeIcons.WAVE_PULSE, url: '/Surveys' },
        { label: currentUser ? `Hello, ${currentUser.username}` : 'Login', icon: currentUser ? PrimeIcons.USER : PrimeIcons.USERS, url: currentUser ? '/profile' : '/login', onClick: currentUser ? null : login },
        { label: 'Logout', icon: 'pi pi-sign-out', url: '/logout', onClick: logout }
    ];

    return (
        <div className="card" >
            <TabMenu model={items.map(item => ({ label: <NavLink style={{ height: "3rem" }} className="navLink" onClick={item.onClick}>{item.label}</NavLink>, icon: item.icon, command: () => window.location.href = item.url }))} />

        </div>
    )
}

