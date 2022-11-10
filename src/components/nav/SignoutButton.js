import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

export const SignoutButton = () => {
    const { oktaAuth} = useOktaAuth();
    const signout = async () => oktaAuth.signOut('/');
    return (
        <button onClick={signout}>Logout</button>
    );
}