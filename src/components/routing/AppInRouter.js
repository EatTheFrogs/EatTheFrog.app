import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginCallback, useOktaAuth } from '@okta/okta-react';
import { oktaSignInConfig } from '../../config/OktaConfig';
import { AppContext } from './SecureRoutes';
import { SecureRoute } from './SecureRoute'
import { NavBar } from '../nav/NavBar.js';
import { HomePage, NotFoundPage, NotFoundReroutePage, LoginPage, EventsPage, GoalsPage } from '../../pages'

export const AppInRouter = () => {

    const {oktaAuth, authState} = useOktaAuth();
    const { user, setUser, setIsLoading, scrollable } = useContext(AppContext);

    useEffect(() => {
        if(authState?.isAuthenticated) {
            if(user == null) {
                setIsLoading(true);
            }
            oktaAuth.getUser()
            .then(oktaUser => oktaUser.sub)
            .then(uuid => {
                setUser({
                    "uuid": uuid,
                    "accessToken": oktaAuth.getAccessToken()
                })
            })
            .then(() => setIsLoading(false));
        }
    }, [oktaAuth, authState]);

    useEffect(() => {
        let htmlTagStyle = document?.getElementsByTagName('html')?.[0]?.style;
        let bodayTagStyle = document?.body?.style;

        if(htmlTagStyle == null || bodayTagStyle == null) {
            return;
        }

        if(scrollable) {
            bodayTagStyle.overflowY = 'unset';
            bodayTagStyle.position = 'unset';
            bodayTagStyle.height = 'unset';
            bodayTagStyle.touchAction = 'unset';
            htmlTagStyle.overflowY = 'unset';
            htmlTagStyle.position = 'unset';
            htmlTagStyle.height = 'unset';
            htmlTagStyle.touchAction = 'unset';
        } else {
            bodayTagStyle.overflowY = 'hidden';
            bodayTagStyle.position = 'fixed';
            bodayTagStyle.height = '100%';
            bodayTagStyle.touchAction = 'none';
            htmlTagStyle.overflowY = 'hidden';
            htmlTagStyle.position = 'fixed';
            htmlTagStyle.height = '100%';
            htmlTagStyle.touchAction = 'none';
        }
    }, [scrollable]);

    return (
        <>
            <NavBar/>
            <Routes>
                <Route exact path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage oktaConfig={oktaSignInConfig}/>}/>
                <Route exact path='/login/callback' element={<LoginCallback/>} />
                <Route exact path='/goals' element={<SecureRoute/>}>
                    <Route exact path='/goals' element={<GoalsPage/>}/>
                </Route>
                <Route exact path='/events' element={<SecureRoute/>}>
                    <Route exact path='/events' element={<EventsPage/>}/>
                </Route>
                <Route exact path="/404" element={<NotFoundPage/>}/>
                <Route path="*" element={<NotFoundReroutePage/>} />
            </Routes>
        </>
    )
}