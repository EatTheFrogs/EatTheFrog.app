import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from "react-router-dom";
import { MAX_EVENTTEMPLATE_NAME_LENGTH, DEFAULT_TYPE, EVENT_FIELD_TYPE_TEXT } from '../../config/GlobalVars';
import { deleteEventTemplateRequest } from '../../client/AxiosClient';
import { AppContext } from '../routing/SecureRoutes';
import { EventTemplateNamePopup } from '../popup/EventTemplateNamePopup';
import { EventTemplateFieldPopup } from '../popup/EventTemplateFieldPopup';
import { DeletePopup } from '../popup/DeletePopup';
import { EventTemplateField } from './fields/EventTemplateField';
import '../../styles/GoalsCreateModify.css'

const defaultEventTemplateField = {
    "name": "",
    "type": EVENT_FIELD_TYPE_TEXT,
    "unit": ""
}

const liftEventTemplateField = {
    "name": "",
    "sets": []
}

export const EventTemplate = ({ eventTemplate }) => {

    const { setGoals, user, setIsLoading, setScrollable } = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [eventTemplateName, setEventTemplateName] = useState(eventTemplate.name);
    const [showTemplateNamePopup, setShowTemplateNamePopup] = useState(false);
    const [showTemplateFieldPopup, setShowTemplateFieldPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    useEffect(() => {
        setEventTemplateName(eventTemplate.name)
    }, [eventTemplate]);

    useEffect(() => {
        setScrollable(!(showTemplateNamePopup || showTemplateFieldPopup, showDeletePopup));
    }, [showTemplateNamePopup, showTemplateFieldPopup, showDeletePopup]);

    const editTemplateClicked = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        setShowTemplateNamePopup(true);
    }

    const deleteTemplate = (e) => {
        e.preventDefault();
        setIsLoading(true);
        deleteEventTemplateRequest(eventTemplate.id, user.accessToken)
            .then(response => {
                setSearchParams({
                    goal: eventTemplate.goalId
                });
                return response;
            })  
            .then(response => setGoals(response));
    }

    const onEventTemplateNameChange = (e) => {
        if(e.target.value.length > MAX_EVENTTEMPLATE_NAME_LENGTH) {
            e.target.value = e.target.value.substring(0, MAX_EVENTTEMPLATE_NAME_LENGTH);
        } 

        setEventTemplateName(e.target.value);
    }

    const addEventTemplateFieldClicked = (e) => {
        window.scrollTo(0, 0);
        setShowTemplateFieldPopup(true);
    }

    return (
        <div id="event-template">
            <div className="edit-template-buttons flex-row">
                <button className="edit-template-button red" onClick={() => setShowDeletePopup(true)}>Delete Template</button>
                <button className="edit-template-button grey" onClick={editTemplateClicked}>Edit Name</button>
            </div>
            <div className="event-template-header-container">
                <label className="input-row-label no-float" htmlFor="template-name-input">Template Name:</label>
                <input className="input-row" id="template-name-input" name="template-name-input" type="text" placeholder="E.g., Outdoor Run" value={eventTemplateName} onChange={e => onEventTemplateNameChange(e)} disabled={true}/>
            </div>
            {
                showTemplateNamePopup ?
                    <EventTemplateNamePopup eventTemplate={eventTemplate} setShowTemplateNamePopup={setShowTemplateNamePopup}/>
                :
                    null
            }
            <p className="event-template-fields-header">Template Fields</p>
            <button id="add-event-field-button" onClick={addEventTemplateFieldClicked}>+ Add New Field to Template</button>
            {
                showTemplateFieldPopup ?
                (
                    <EventTemplateFieldPopup eventField={eventTemplate.type === DEFAULT_TYPE ? defaultEventTemplateField : liftEventTemplateField} eventTemplate={eventTemplate} setShowTemplateFieldPopup={setShowTemplateFieldPopup}/>
                )
                :
                    null
            }
            <div id="event-fields-container">
                {
                    eventTemplate.fields.map((field) => 
                        <EventTemplateField key={field.id} eventField={field} eventTemplate={eventTemplate}/>
                    )
                }
            </div>
            {
                    showDeletePopup ? 
                        <DeletePopup deleteMessage={"Are you sure you want to delete this templates?"} cancelCallback={() => setShowDeletePopup(false)} deleteCallback={deleteTemplate}/>
                    :
                        null
                }
        </div>
    );
}