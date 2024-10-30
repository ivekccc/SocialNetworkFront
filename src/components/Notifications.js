import React from 'react';
import './Notifications.css';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Notifications() {
    const navigate = useNavigate();

    return (
        <div className="notifications-container">
            <div className="notifications-header">
                <div className="header-top">
                    <h2>Obaveštenja</h2>
                    <button className="close-btn" onClick={() => navigate('/')}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
            </div>

            <div className="notifications-list">
                {/* Ovde će ići lista obaveštenja */}
                <div className="empty-notifications">
                    <span className="material-icons">notifications_none</span>
                    <p>Nemate novih obaveštenja</p>
                </div>
            </div>
        </div>
    );
}

export default Notifications;