import React, { useEffect, useContext, useState } from 'react';
import { GoalsCreateModify } from '../components/goal/GoalsCreateModify';
import { AppContext } from '../components/routing/SecureRoutes';
import { getAllGoalsRequest } from '../client/AxiosClient';
import { Loading } from '../components/loading/Loading';
import '../styles/Global.css';
import '../styles/GoalsPage.css';

export const GoalsPage = () => {

    const { goals, setGoals, user, isLoading, setIsLoading, setScrollable, setNavHovered } = useContext(AppContext);
    const [showEventTemplatePopup, setShowEventTemplatePopup] = useState(false);

    useEffect(() => {
        setScrollable(true);
        window.scrollTo(0, 0);
        setNavHovered(false);
    }, []);

    useEffect(() => {
        if(user != null) {
            setIsLoading(true);
            getAllGoalsRequest(user.uuid, user.accessToken)
                    .then(response => setGoals(response));
        }
    }, [user]);
    
    useEffect(() => {
        if(goals != null) {
            setIsLoading(false)
        }
    }, [goals]);

    return (
        isLoading ?
        (
            <Loading />
        )
        :
        (
            <div className="page goals-page frog-background">
                <div className="page-header padding-bottom" id="goals-header-container">
                    <GoalsCreateModify showEventTemplatePopup={showEventTemplatePopup} setShowEventTemplatePopup={setShowEventTemplatePopup}/>
                </div>
            </div>
        )
    );
}