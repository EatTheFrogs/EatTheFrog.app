import React, { useEffect, useContext } from 'react';
import { AppContext } from '../components/routing/SecureRoutes';
import { OktaLogin } from '../components/login/OktaLogin'
import '../styles/Global.css';
import '../styles/LoginPage.css';

export const LoginPage = ({ oktaConfig }) => {

    const { setScrollable, setNavHovered } = useContext(AppContext);

    useEffect(() => {
        setScrollable(true);
        window.scrollTo(0, 0);
        setNavHovered(false);
    }, []);

    return (
        <div className="page flex-column frog-background">
            <div id="login-container">
                <OktaLogin oktaConfig={oktaConfig} />
            </div>
        </div>
    );
}