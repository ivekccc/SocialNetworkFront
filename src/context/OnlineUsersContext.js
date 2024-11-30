import React, { createContext, useState, useEffect } from 'react';
import WebSocketService from '../services/WebSocketService';

export const OnlineUsersContext = createContext([]);

export const OnlineUsersProvider = ({ children }) => {
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");

        if (username && token) {
            WebSocketService.connect(username, setOnlineUsers, token);
        }

        return () => {
            WebSocketService.disconnectUser(username);
        };
    }, []);

    return (
        <OnlineUsersContext.Provider value={onlineUsers}>
            {children}
        </OnlineUsersContext.Provider>
    );
};
