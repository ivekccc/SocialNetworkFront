// src/context/AuthContext.js

import React, { createContext, useContext, useState,useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        const token = localStorage.getItem('token');
        const username=localStorage.getItem('username')
        return {
            token: token ? token : null,
            username: username? username:null,
        };
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token) {
            setAuthData({ token, username: username });
        }
    }, []);

    const login = (token,username) => {
        setAuthData({ token, username: username });
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
    };

    const logout = () => {
        setAuthData({ token: null, username: null });
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    };

    return (
        <AuthContext.Provider value={{ authData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
