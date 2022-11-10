import React, { useContext, useEffect } from 'react';
import { AppContext } from '../components/SecureRoutes';
import { Loading } from '../components/Loading';
import '../styles/Global.css';

export const ProfilePage = () => {

    const { isLoading, setScrollable, setNavHovered } = useContext(AppContext);

    useEffect(() => {
        setScrollable(true);
        window.scrollTo(0, 0);
        setNavHovered(false);
    }, []);
    
    return (
        isLoading ?
        (
            <Loading />
        )
        :
        (
            <div className="page frog-background">
                <div className="page-header">
                    <h1>Progile Page</h1>
                </div>
            </div>
        )
    );
}