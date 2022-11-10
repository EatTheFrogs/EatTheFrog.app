import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserButton } from './UserButton'
import '../../styles/NavBar.css';

export const NavBar = () => {
    const navigate = useNavigate();
    return (
        <div id="landing-nav-bar" className="flex-row">
            <h1 className="title" onClick={() => navigate('/')}>Eat The Frog</h1>
            <UserButton/>
        </div>
    );
}