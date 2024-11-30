import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SearchPanel from './SearchPanel';
import NotificationsPanel from './NotificationsPanel';
import './Sidebar.css';
import WebSocketService from '../services/WebSocketService';

function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    useEffect(() => {
        setIsSearchOpen(false);
        setIsNotificationsOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        const username = localStorage.getItem("username");
        WebSocketService.disconnectUser(username);
        logout();
        navigate("/login");
    };

    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    const toggleSearch = (e) => {
        e?.preventDefault();
        if (isNotificationsOpen) {
            setIsNotificationsOpen(false);
            setTimeout(() => {
                setIsSearchOpen(!isSearchOpen);
            }, 300);
        } else {
            setIsSearchOpen(!isSearchOpen);
        }
    };

    const toggleNotifications = (e) => {
        e?.preventDefault();
        if (isSearchOpen) {
            setIsSearchOpen(false);
            setTimeout(() => {
                setIsNotificationsOpen(!isNotificationsOpen);
            }, 300);
        } else {
            setIsNotificationsOpen(!isNotificationsOpen);
        }
    };

    return (
        <div className="sidebar-container">
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <h2>Social App</h2>
                </div>

                <nav className="sidebar-menu">
                    <div className="menu-items">
                        <Link to="/" className={`menu-item ${isActiveRoute('/') ? 'active' : ''}`}>
                            <span className="material-icons menu-icon">home</span>
                            <span>Početna</span>
                        </Link>

                        <a href="#"
                           onClick={toggleSearch}
                           className={`menu-item ${isSearchOpen ? 'active' : ''}`}
                        >
                            <span className="material-icons menu-icon">search</span>
                            <span>Pretraga</span>
                        </a>

                        <Link to="/explore" className={`menu-item ${isActiveRoute('/explore') ? 'active' : ''}`}>
                            <span className="material-icons menu-icon">explore</span>
                            <span>Istražite</span>
                        </Link>

                        <Link to="/messages" className={`menu-item ${isActiveRoute('/messages') ? 'active' : ''}`}>
                            <span className="material-icons menu-icon">mail</span>
                            <span>Poruke</span>
                        </Link>

                        <a href="#"
                           onClick={toggleNotifications}
                           className={`menu-item ${isNotificationsOpen ? 'active' : ''}`}
                        >
                            <span className="material-icons menu-icon">notifications</span>
                            <span>Obaveštenja</span>
                        </a>

                        <Link to="/profile" className={`menu-item ${isActiveRoute('/profile') ? 'active' : ''}`}>
                            <span className="material-icons menu-icon">person</span>
                            <span>Profil</span>
                        </Link>
                    </div>

                    <div className="bottom-menu">
                        <Link to="/settings" className={`menu-item ${isActiveRoute('/settings') ? 'active' : ''}`}>
                            <span className="material-icons menu-icon">settings</span>
                            <span>Podešavanja</span>
                        </Link>

                        <button onClick={handleLogout} className="menu-item logout-btn">
                            <span className="material-icons menu-icon">logout</span>
                            <span>Odjavi se</span>
                        </button>
                    </div>
                </nav>
            </aside>

            <SearchPanel
                isOpen={isSearchOpen}
                onClose={toggleSearch}
            />

            <NotificationsPanel
                isOpen={isNotificationsOpen}
                onClose={toggleNotifications}
            />
        </div>
    );
}

export default Sidebar;