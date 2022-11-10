import React, {useEffect} from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { toRelativeUrl } from '@okta/okta-auth-js';
import { Outlet } from 'react-router-dom';
import { Loading } from '../loading/Loading' 

export const SecureRoute = () => {
    const { oktaAuth, authState } = useOktaAuth();

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to landing page
    //return authState?.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;

    useEffect(() => {
        if (!authState) {
          return;
        }
    
        if (!authState?.isAuthenticated) {
          const originalUri = toRelativeUrl(window.location.href, window.location.origin);
          oktaAuth.setOriginalUri(originalUri);
          oktaAuth.signInWithRedirect();
        }
    }, [oktaAuth, !!authState, authState?.isAuthenticated]);
        
    if (!authState || !authState?.isAuthenticated) {
        return (<Loading />);
    }
    
    return (<Outlet />);
}