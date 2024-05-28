// import { NavLink } from "react-router-dom"
// import { TabMenu } from 'primereact/tabmenu';

// export default function Header() {
//     function logout() {
//         localStorage.removeItem("currentUser");
//     }
    
//     function login() {
//         localStorage.setItem("currentUser", "true");
//         if (localStorage.getItem("currentUser") === "true") {
//             return (
//                 <>

//                 </>
//             );
//         };
//     }
//     return (
//     <>
//             <nav>
//                 {/* <NavLink className="navLink" to='.' end>HOME</NavLink> */}
//                 <TabMenu className="navLink" to={`AboutUs`}>About Us</TabMenu>
//                 <NavLink className="navLink" to={`ContactUs`}>Contact Us</NavLink>
//                 <NavLink className="navLink" to={`Surveys`}>Surveys</NavLink>
//                 <NavLink className="navLink" onClick={() => login()} to={`/login`}>Login</NavLink>
//                 <NavLink className="navLink" onClick={() => logout()} to={`/login`}>Logout</NavLink>
//             </nav>
//         </>
//     )
// }


import React from 'react';
import { TabMenu } from 'primereact/tabmenu';

export default function BasicDemo() {
    const items = [
        { label: 'AboutUs', icon: 'pi pi-home', url: '/AboutUs' },
        { label: 'ContactUs', icon: 'pi pi-chart-line', url: '/ContactUs' },
        { label: 'Surveys', icon: 'pi pi-list', url: '/Surveys' },
        { label: 'Messages', icon: 'pi pi-inbox', url: '/messages' },
        { label: 'Login', icon: 'pi pi-sign-in', url: '/login', onClick: login() },
        { label: 'Logout', icon: 'pi pi-sign-out', url: '/logout', onClick: logout() }
    ];

    return (
        <div className="card">
            <TabMenu model={items.map(item => ({ label: <div className="navLink" onClick={item.onClick}>{item.label}</div>, icon: item.icon, command: () => window.location.href = item.url }))} />
        </div>
    )
}

