import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './PrivateLayout.css';

function PrivateLayout() {
    return (
        <div className="layout-container">
            <Sidebar />
            <div className="main-content">
                <div className="content-wrapper">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default PrivateLayout;