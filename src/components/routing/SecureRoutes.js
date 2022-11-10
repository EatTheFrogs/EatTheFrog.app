import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { oktaAuthConfig } from '../../config/OktaConfig';
import { AppInRouter } from './AppInRouter';


const oktaAuthObj = new OktaAuth(oktaAuthConfig);

export const AppContext = React.createContext({
    goals: null,
    setGoals: () => {},
    currentGoal: null,
    setCurrentGoal: () => {},
    user: null,
    setUser: () => {},
    isLoading: false,
    setIsLoading: () => {},
    scrollable: true,
    setScrollable: () => {},
    navHovered: false,
    setNavHovered: () => {}
});

export const SecureRoutes = () => {

    const navigate = useNavigate()
    const navigateRef = useRef(navigate)

    const [goals, setGoals] = useState(null);
    const [currentGoal, setCurrentGoal] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [scrollable, setScrollable] = useState(true);
    const [navHovered, setNavHovered] = useState(false);
    const appContextValue = { goals, setGoals, currentGoal, setCurrentGoal, user, setUser, isLoading, setIsLoading, scrollable, setScrollable, navHovered, setNavHovered };

    useEffect(() => {
        if(scrollable) {
            window.scrollTo(0, 0);
        }
    }, [scrollable]);


    const onAuthRequired = () => {
        navigate('/login');
    };

    // Allow for "stale" navigate references since originalUri will be an absolute URL
    const restoreOriginalUri = useCallback((_, originalUri = '/') => {
        const url = toRelativeUrl(originalUri, window.location.origin)
        navigateRef.current(url)
    }, []);

    useEffect(() => {
        return () => { oktaAuthObj.options.restoreOriginalUri = undefined }
    }, []);

    return (
        <Security oktaAuth={oktaAuthObj} onAuthRequired={onAuthRequired} restoreOriginalUri={restoreOriginalUri}>
            <AppContext.Provider value={appContextValue}>
                <AppInRouter/>
            </AppContext.Provider>
        </Security>
    )
}