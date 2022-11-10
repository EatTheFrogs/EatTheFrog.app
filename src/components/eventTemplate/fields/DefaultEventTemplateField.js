import React, { useState, useContext, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { deleteEventTemplateFieldRequest } from '../../../client/AxiosClient';
import { AppContext } from '../../routing/SecureRoutes';
import { DefaultEventTemplateFieldPopup } from '../../popup/DefaultEventTemplateFieldPopup'
import '../../../styles/GoalsCreateModify.css'

export const DefaultEventTemplateField = ({ eventField, templateId, goalId }) => {

    const { setGoals, user, setIsLoading, setScrollable } = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [showTemplateFieldPopup, setShowTemplateFieldPopup] = useState(false);

    useEffect(() => {
        setScrollable(!showTemplateFieldPopup);
    }, [showTemplateFieldPopup]);

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
            <DefaultEventTemplateFieldPopup eventField={eventField} templateId={templateId} goalId={goalId} setShowTemplateFieldPopup={setShowTemplateFieldPopup}/>
        )
        :
        (
            <div className="event-field-config-container">
                <div className="event-field-config-header flex-row">
                    <label className="event-field-config-label" htmlFor="event-field-name-input"><b>{eventField.name}:</b></label>
                    <input className="event-field-config-input" name="event-field-name-input" type="text" placeholder={eventField.type} disabled={true}/>
                    <p className="event-field-config-unit">{eventField.unit}</p>
                </div>
                <div className="event-field-config-buttons">
                    <button className="event-field-config-button left-button red" onClick={deleteField}>Delete</button>
                    <button className="event-field-config-button right-button grey" onClick={editField}>Edit Field</button>
                </div>
            </div>
        )
    );
}