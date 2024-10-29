// src/context/AuthContext.js

import React, { createContext, useContext, useState,useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(() => {
        const token = localStorage.getItem('token');
        return {
            token: token ? token : null,
            user: null,
        };
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthData({ token, user: null });
        }
    }, []);

    const login = (token) => {
        setAuthData({ token, user: null });
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setAuthData({ token: null, user: null });
        localStorage.removeItem('token');
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
