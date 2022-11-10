import React, { useState, useContext, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { deleteEventTemplateFieldRequest } from '../../../client/AxiosClient';
import { AppContext } from '../../routing/SecureRoutes';
import { LiftEventTemplateFieldPopup } from '../../popup/LiftEventTemplateFieldPopup'
import '../../../styles/GoalsCreateModify.css'

export const LiftEventTemplateField = ({ eventField, templateId, goalId }) => {

    const { setGoals, user, setIsLoading, setScrollable } = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [setsString, setsetsString] = useState();
    const [showTemplateFieldPopup, setShowTemplateFieldPopup] = useState(false);

    useEffect(() => {
        setScrollable(!showTemplateFieldPopup);
    }, [showTemplateFieldPopup]);

    useEffect(() => {
        setsetsString(getSetsString());
    }, [eventField]);

    const getSetsString = () => {
        let fullString = eventField?.sets.map(set => `${set.reps}x${set.weight}`).join(", ");
        return fullString.length <= 15 ? fullString : `${fullString.substring(0, 15)}...`;
    }

    const editField = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        setShowTemplateFieldPopup(true);
    }
    
    const deleteField = (e) => {
        e.preventDefault();
        setIsLoading(true);
        deleteEventTemplateFieldRequest(templateId, eventField.id, user.accessToken)
            .then(response => {
                setSearchParams({
                    goal: goalId
                });
                return response;
            }) 
            .then(response => setGoals(response))
            .then(() => setIsLoading(false));;
    }

    return (
        showTemplateFieldPopup ?
        (
            <LiftEventTemplateFieldPopup eventField={eventField} templateId={templateId} goalId={goalId} setShowTemplateFieldPopup={setShowTemplateFieldPopup}/>
        )
        :
        (
            <div className="event-field-config-container">
                <div className="event-field-config-header flex-row">
                    <label className="event-field-config-label"><b>{eventField.name}:</b></label>
                    <p className="event-field-config-sets">{setsString}</p>
                </div>
                <div className="event-field-config-buttons">
                    <button className="event-field-config-button left-button red" onClick={deleteField}>Delete</button>
                    <button className="event-field-config-button right-button grey" onClick={editField}>Edit Field</button>
                </div>
            </div>
        )
    );
}