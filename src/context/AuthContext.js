// src/context/AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({
        token: null,
        user: null,
    });

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
