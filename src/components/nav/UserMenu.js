import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginButton } from './LoginButton'
import { SignoutButton } from './SignoutButton'
import '../../styles/UserButton.css';

export const UserMenu = ( { dropDownHovered, updateDropDownHovered } ) => {
    const { authState } = useOktaAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const selectedStyle = {color: '#888888'};

    return (
        <div id="user-menu-container" style={ {display: dropDownHovered ? 'block' : 'none'}} onMouseEnter={() => updateDropDownHovered(true)} onMouseLeave={() => updateDropDownHovered(false)}>
            <ul id="user-menu">
                <li className="user-menu-item">
                    <button onClick={location.pathname !== '/' ? () => navigate('/') : null} style={location.pathname === '/' ? selectedStyle : {}}>Home</button>
                </li>
                {
                    authState?.isAuthenticated ?
                    <>
                        <li className="user-menu-item">
                            <button onClick={location.pathname !== '/goals' ? () => navigate('/goals') : null} style={location.pathname === '/goals' ? selectedStyle : {}}>Manage Goals</button>
                        </li>
                        <li className="user-menu-item">
                            <button onClick={location.pathname !== '/events' ? () => navigate('/events') : null} style={location.pathname === '/events' ? selectedStyle : {}}>Event Log</button>
                        </li>
                        <li className="user-menu-item">
                            <SignoutButton/>
                        </li>
                    </>
                    :
                    <li className="user-menu-item">
                        <LoginButton clicked={location.pathname !== '/login' ? () => navigate('/login') : null} styled={location.pathname === '/login' ? selectedStyle : {}}/>
                    </li>
                }
            </ul>
        </div>
    )
}