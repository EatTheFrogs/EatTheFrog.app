import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OktaLogin } from '../components/OktaLogin'
import '../styles/Global.css';
import '../styles/LoginPage.css';

export const LoginPage = ({ oktaConfig }) => {
    const navigate = useNavigate();
    return (
        <div className="page frog-background">
            <h1 className="title" id="login-title" onClick={() => navigate('/')}>Eat The Frog</h1>
            <div id="login-container">
                <OktaLogin oktaConfig={oktaConfig} />
            </div>
        </div>
    );
}