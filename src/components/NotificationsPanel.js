import React, { useState } from 'react';
import './NotificationsPanel.css';

function NotificationsPanel({ isOpen, onClose }) {
    const [notifications, setNotifications] = useState([]);


    return (
        <div className={`notifications-panel ${isOpen ? 'open' : ''}`}>
            <div className="notifications-header">
                <h3>Obaveštenja</h3>
                <button onClick={onClose} className="close-notifications">
                    <span className="material-icons">close</span>
                </button>
            </div>
            <div className="notifications-content">
                {notifications.map((notification, index) => (
                    <div className="notification-item" key={index}>
                        <div className="notification-details">
                            <p className="notification-text">
                                <strong>{notification.senderUsername}</strong> je započeo da vas prati
                            </p>
                            <span className="notification-time">{notification.sendTime}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NotificationsPanel;