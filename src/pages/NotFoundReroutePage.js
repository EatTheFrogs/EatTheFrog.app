import React from 'react';
import { Navigate } from 'react-router-dom';

export const NotFoundReroutePage = () => {
    return <Navigate to="/404"/>
}