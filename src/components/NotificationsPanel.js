import React from 'react';
import './NotificationsPanel.css';

function NotificationsPanel({ isOpen, onClose }) {
    return (
        <div className={`notifications-panel ${isOpen ? 'open' : ''}`}>
            <div className="notifications-header">
                <h3>Obaveštenja</h3>
                <button onClick={onClose} className="close-notifications">
                    <span className="material-icons">close</span>
                </button>
            </div>
            <div className="notifications-content">
                {/* Пример обавештења */}
                <div className="notification-item">
                    <div className="notification-avatar">
                        <span className="material-icons">person</span>
                    </div>
                    <div className="notification-details">
                        <p className="notification-text">
                            <strong>Marko Marković</strong> je započeo da vas prati
                        </p>
                        <span className="notification-time">pre 2 sata</span>
                    </div>
                </div>

                <div className="notification-item">
                    <div className="notification-avatar">
                        <span className="material-icons">favorite</span>
                    </div>
                    <div className="notification-details">
                        <p className="notification-text">
                            <strong>Ana Anić</strong> se sviđa vaša objava
                        </p>
                        <span className="notification-time">pre 5 sati</span>
                    </div>
                </div>

                {/* Можете додати више обавештења овде */}
            </div>
        </div>
    );
}

export default NotificationsPanel;