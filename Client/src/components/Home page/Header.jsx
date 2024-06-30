import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { PrimeIcons } from 'primereact/api';
import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useUser } from '../personalArea/UserContext';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import './HomePageStyle.css';

export default function Header() {
    const { currentUser, login, logout } = useUser();
    const [activeItem, setActiveItem] = useState(null);
    const [visible, setVisible] = useState(false);

    const items = [
        { label: 'Home Page', icon: PrimeIcons.SLACK, url: '/' },
        { label: 'Contact Us', icon: PrimeIcons.PHONE, url: '/ContactUs' },
        { label: 'Surveys', icon: PrimeIcons.WAVE_PULSE, url: '/Surveys' },
    ];

    const authItems = [
        { label: currentUser ? `Hello, ${currentUser.username}` : 'Login', icon: currentUser ? PrimeIcons.USER : PrimeIcons.USERS, url: currentUser ? '/profile' : '/login', onClick: currentUser ? null : login },
        { label: 'Logout', icon: 'pi pi-sign-out', url: '/logout', onClick: logout }
    ];

    const handleTabChange = (e) => {
        setActiveItem(e.value);
        window.location.href = e.value.url;
    };

    return (
        <div>
            <div className="header-container">
                <div className="card tab-menu-left">
                    <TabMenu model={items} activeitem={activeItem} onTabChange={handleTabChange} />
                </div>
                <div className="card tab-menu-right">
                    <TabMenu model={authItems} activeitem={activeItem} onTabChange={handleTabChange} />
                </div>
            </div>
            <Button icon="pi pi-bars" className="p-button-primary hamburger" onClick={() => setVisible(true)} />
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {items.map((item, index) => (
                        <Button key={index} label={item.label} icon={item.icon} className="p-button-text" onClick={() => window.location.href = item.url} />
                    ))}
                    {authItems.map((item, index) => (
                        <Button key={index + items.length} label={item.label} icon={item.icon} className="p-button-text" onClick={item.onClick ? item.onClick : () => window.location.href = item.url} />
                    ))}
                </div>
            </Sidebar>
        </div>
    );
}
