import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { PrimeIcons } from 'primereact/api';
import React, { useState, useEffect } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useUser } from '../personalArea/UserContext';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import Profile from './Profile';
import './HomePageStyle.css';

export default function Header() {
    const { currentUser, login, logout } = useUser();
    const [activeItem, setActiveItem] = useState(null);
    const [visible, setVisible] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (currentUser) {
            setUserName(currentUser.username);
        } else {
            setUserName('');
        }
    }, [currentUser]);

    const handleTabChange = (e) => {
        setActiveItem(e.value);
        window.location.href = e.value.url;
    };

    const items = [
        { label: 'Home Page', icon: PrimeIcons.SLACK, url: '/' },
        { label: 'Contact Us', icon: PrimeIcons.PHONE, url: '/ContactUs' },
        {
            label: 'Surveys',
            icon: PrimeIcons.WAVE_PULSE,
            url: currentUser ? `/users/${currentUser.id}/surveys` : '/login'
        }
    ];

    const authItems = [
        {
            label: (
                <span style={{ display: 'flex', alignItems: 'center' }}>
                    {currentUser ? `Hello, ${currentUser.username}` : 'Login'}
                </span>
            ),
            icon: currentUser ? null : PrimeIcons.USERS,
            url: currentUser ? window.location.href : '/login',
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
                console.log('logout');
                logout(); // Logout user
                sessionStorage.clear(); // Clear session storage
                window.location.href = '/'; // Redirect to home page or any other page
            }
        }
    ];

    return (
        <div>
            <div className="header-container">
                <div className="card tab-menu-left">
                    <TabMenu model={items} activeItem={activeItem} onTabChange={handleTabChange} />
                </div>
                <div className="card tab-menu-right">
                    <TabMenu model={authItems} activeItem={activeItem} onTabChange={handleTabChange} />
                </div>
            </div>
            <Button icon="pi pi-bars" className="p-button-primary hamburger" onClick={() => setVisible(true)} />
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {items.map((item, index) => (
                        <Button
                            key={index}
                            label={item.label}
                            icon={item.icon}
                            className="p-button-text"
                            onClick={() => window.location.href = item.url}
                        />
                    ))}
                    {authItems.map((item, index) => (
                        <Button
                            key={index + items.length}
                            label={item.label}
                            icon={item.icon}
                            className="p-button-text"
                            onClick={item.command ? item.command : () => window.location.href = item.url}
                        />
                    ))}
                </div>
            </Sidebar>
            {showProfile && (
                <div className="profile-overlay">
                    <div className="profile-card">
                        <span className="pi pi-times profile-close" onClick={() => setShowProfile(false)}></span>
                        <Profile />
                    </div>
                </div>
            )}
        </div>
    );
}
