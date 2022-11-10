import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from "react-router-dom";
import { MAX_EVENTTEMPLATE_NAME_LENGTH } from '../../config/GlobalVars';
import { patchEventTemplateRequest } from '../../client/AxiosClient';
import { AppContext } from '../routing/SecureRoutes';
import '../../styles/GoalsCreateModify.css'

export const EventTemplateNamePopup = ({ eventTemplate, setShowTemplateNamePopup }) => {

    const { setGoals, user, setIsLoading, setScrollable } = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [eventTemplateName, setEventTemplateName] = useState(eventTemplate.name);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        setEventTemplateName(eventTemplate.name);
    }, [eventTemplate]);

    useEffect(() => {
        validateFields();
    }, [eventTemplateName]);

    const validateFields = () => {
        setValid(eventTemplateName.length > 0 && eventTemplateName.length <= MAX_EVENTTEMPLATE_NAME_LENGTH && eventTemplateName !== eventTemplate.name);
    }

    const onNameChange = (e) => {
        if(e.target.value.length > MAX_EVENTTEMPLATE_NAME_LENGTH) {
            e.target.value = e.target.value.substring(0, MAX_EVENTTEMPLATE_NAME_LENGTH);
        } 
        setEventTemplateName(e.target.value);
    }

    const saveFieldClicked = (e) => {
        e.preventDefault();
        let payload = {
            ...eventTemplate,
            "name": eventTemplateName
        };
        setIsLoading(true);
        patchEventTemplateRequest(payload, user.accessToken)
            .then(response => {
                setSearchParams({
                    goal: eventTemplate.goalId,
                    template: eventTemplate.id
                });
                return response;
            })
            .then(response => setGoals(response))
            .then(() => setScrollable(true))
            .then(() => setShowTemplateNamePopup(false))
            .then(() => setIsLoading(false));
    }

    const cancelClick = (e) => {
        setScrollable(true);
        setShowTemplateNamePopup(false);
    }

    const stopClickPropagation = (e) => {
        e.stopPropagation();
    }
    
    return (
        <div className="popup-container-background" onClick={cancelClick}>
            <div className="popup-container" onClick={stopClickPropagation}>
                <div className="popup-container-inner">
                    <p className="popup-header">Edit Template Name</p>
                    <div className="popup-input">
                        <div className="input-row-container">
                            <label className="input-row-label" htmlFor="event-field-name-input">Field Name:</label>
                            <p className="input-row-restraint">* {MAX_EVENTTEMPLATE_NAME_LENGTH} characters max ({eventTemplateName?.length}/{MAX_EVENTTEMPLATE_NAME_LENGTH})</p> 
                            <input className="input-row" name="event-field-name-input" type="text" placeholder="Template Name" value={eventTemplateName} onChange={e => onNameChange(e)}/>
                        </div>
                        <div className="popup-buttons flex-row">
                            <button className="popup-button red" onClick={cancelClick}>Cancel</button>
                            <button className="popup-button light-green" onClick={saveFieldClicked} disabled={!valid}>Save Field</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}