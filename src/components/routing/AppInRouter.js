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
        if(scrollable) {
            document.body.style.overflow = 'unset';
        } else {
            document.body.style.overflow = 'hidden';
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