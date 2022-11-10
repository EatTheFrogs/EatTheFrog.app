import { Navigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { OktaSignInWidget } from './OktaSignInWidget';

export const OktaLogin = ({ oktaConfig }) => {
    const { oktaAuth, authState } = useOktaAuth();
    oktaAuth.start();

    const onSuccess = (tokens) => {
        console.log(tokens);
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (err) => {
        console.log('Error logging in', err);
    };

    if(!authState) {
        return null;
    }

    return authState.isAuthenticated ?
        <Navigate to={{ pathname: '/home' }}/> :
        <OktaSignInWidget
            oktaConfig={oktaConfig}
            onSuccess={onSuccess}
            onError={onError}/>;
};