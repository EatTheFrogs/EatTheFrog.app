import React from 'react';
import { NavBar } from '../components/NavBar';
import { GoalsEvents } from '../components/GoalsEvents';
import '../styles/Global.css';
import '../styles/GoalsPage.css';

export const GoalsEventsPage = () => {
    return (
        <div className="page goals-page">
            <NavBar/>
            <div className="page-header">
                
            </div>
            <div className="page-main">
                <GoalsEvents/>
            </div>
        </div>
    );
}