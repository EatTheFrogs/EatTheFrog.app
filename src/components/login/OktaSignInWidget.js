import React, { useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import { oktaSignInConfig } from '../../config/OktaConfig';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

export const oktaWidget = new OktaSignIn(oktaSignInConfig);

export const OktaSignInWidget = ({ oktaConfig, onSuccess, onError }) => {
    const widgetRef = useRef();
    useEffect(() => {
        if (!widgetRef.current) {
            return false;
        }

        oktaWidget.showSignInToGetTokens({
            el: widgetRef.current,
        })
        .then(onSuccess)
        .catch(onError);

        return () => oktaWidget.remove();
    }, [oktaConfig, onSuccess, onError]);

    return (<div ref={widgetRef} />);
};