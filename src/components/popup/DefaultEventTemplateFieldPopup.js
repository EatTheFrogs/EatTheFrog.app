import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from "react-router-dom";
import { MAX_EVENTTEMPLATE_FIELD_NAME_LENGTH, MAX_EVENTTEMPLATE_FIELD_UNIT_LENGTH, EVENT_FIELD_TYPE_NUMBER, EVENT_FIELD_TYPE_TEXT, EVENT_FIELD_TYPE_DURATION } from '../../config/GlobalVars';
import { postEventTemplateFieldRequest, patchEventTemplateFieldRequest } from '../../client/AxiosClient';
import { AppContext } from '../routing/SecureRoutes';
import '../../styles/GoalsCreateModify.css'

export const DefaultEventTemplateFieldPopup = ({ eventField, templateId, goalId, setShowTemplateFieldPopup, isEventTemplate=true }) => {

    const DURATION_UNITS = "hr / min / sec"

    const { setGoals, user, setIsLoading, setScrollable } = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [name, setName] = useState(eventField.name);
    const [type, setType] = useState(eventField.type);
    const [unit, setUnit] = useState(eventField.unit);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        setName(eventField.name);
        setType(eventField.type);
        setUnit(eventField.unit);
    }, [eventField]);

    useEffect(() => {
        validateFields();
    }, [name, type, unit]);

    useEffect(() => {
        if(type === EVENT_FIELD_TYPE_DURATION) {
            setUnit(DURATION_UNITS);
        }
    }, [type]);

    const validateFields = () => {
        let validName = name.length > 0 && name.length <= MAX_EVENTTEMPLATE_FIELD_NAME_LENGTH;
        let validUnit = unit.length <= MAX_EVENTTEMPLATE_FIELD_UNIT_LENGTH;
        let fieldChanged = name !== eventField.name || type !== eventField.type || unit !== eventField.unit;
        setValid(validName && validUnit && fieldChanged);
    }

    const onNameChange = (e) => {
        if(e.target.value.length > MAX_EVENTTEMPLATE_FIELD_NAME_LENGTH) {
            e.target.value = e.target.value.substring(0, MAX_EVENTTEMPLATE_FIELD_NAME_LENGTH);
        } 
        setName(e.target.value);
    }

    const onTypeChange = (e) => {
        setType(e.target.value);
    }

    const onUnitChange = (e) => {
        if(e.target.value.length > MAX_EVENTTEMPLATE_FIELD_UNIT_LENGTH) {
            e.target.value = e.target.value.substring(0, MAX_EVENTTEMPLATE_FIELD_UNIT_LENGTH);
        } 
        setUnit(e.target.value);
    }

    const saveFieldClicked = (e) => {
        e.preventDefault();
        isEventTemplate ? saveEventTemplateFieldClicked() : saveEventFieldClicked();
    }

    const saveEventFieldClicked = () => {
        console.log(`GoalId: ${goalId}`);
        let payload = {
            ...eventField,
            "name": name,
            "type": type,
            "unit": unit
        };
        setIsLoading(true);
        let promise = eventField.id == null ? postEventTemplateFieldRequest(templateId, payload, user.accessToken) : patchEventTemplateFieldRequest(templateId, payload, user.accessToken)
        promise
            .then(response => {
                console.log(`GoalId: ${goalId}`);
                setSearchParams({
                    goal: goalId,
                    template: templateId
                });
                return response;
            })
            .then(response => setGoals(response))
            .then(() => setScrollable(true))
            .then(() => setShowTemplateFieldPopup(false))
            .then(() => setIsLoading(false));
    }

    const saveEventTemplateFieldClicked = () => {
        console.log(`GoalId: ${goalId}`);
        let payload = {
            ...eventField,
            "name": name,
            "type": type,
            "unit": unit
        };
        setIsLoading(true);
        let promise = eventField.id == null ? postEventTemplateFieldRequest(templateId, payload, user.accessToken) : patchEventTemplateFieldRequest(templateId, payload, user.accessToken)
        promise
            .then(response => {
                console.log(`GoalId: ${goalId}`);
                setSearchParams({
                    goal: goalId,
                    template: templateId
                });
                return response;
            })
            .then(response => setGoals(response))
            .then(() => setScrollable(true))
            .then(() => setShowTemplateFieldPopup(false))
            .then(() => setIsLoading(false));
    }

    const cancelClick = (e) => {
        setScrollable(true);
        setShowTemplateFieldPopup(false);
    }

    const stopClickPropagation = (e) => {
        e.stopPropagation();
    }
    
    return (
        <div className="popup-container-background" onClick={cancelClick}>
            <div className="popup-container" onClick={stopClickPropagation}>
                <div className="popup-container-inner">
                    <p className="popup-header">Edit Template Field</p>
                    <div className="popup-input">
                        <div className="input-row-container">
                            <label className="input-row-label" htmlFor="event-field-name-input">Field Name:</label>
                            <p className="input-row-restraint">* {MAX_EVENTTEMPLATE_FIELD_NAME_LENGTH} characters max ({name?.length}/{MAX_EVENTTEMPLATE_FIELD_NAME_LENGTH})</p> 
                            <input className="input-row" name="event-field-name-input" type="text" placeholder="Name" value={name} onChange={e => onNameChange(e)}/>
                        </div>
                        <div className="type-container flex-row">
                            <label className="type-select-label input-row-label" htmlFor="event-field-type-select">Field Type: </label>
                            <select className="type-select" name="event-field-type-select" value={type} onChange={onTypeChange}>
                                <option value={EVENT_FIELD_TYPE_TEXT}>Text</option>
                                <option value={EVENT_FIELD_TYPE_NUMBER}>Number</option>
                                <option value={EVENT_FIELD_TYPE_DURATION}>Duration</option>
                            </select>
                        </div>
                        <div className="input-row-container">
                            <label className="input-row-label" htmlFor="event-field-unit-input">Unit:</label>
                            {
                                type !== EVENT_FIELD_TYPE_DURATION ?
                                <>
                                    <p className="input-row-restraint">* {MAX_EVENTTEMPLATE_FIELD_UNIT_LENGTH} characters max ({unit?.length}/{MAX_EVENTTEMPLATE_FIELD_UNIT_LENGTH})</p> 
                                    <input className="input-row" name="event-field-unit-input" type="text" placeholder="Unit" value={unit} onChange={e => onUnitChange(e)}/> 
                                </>
                                :
                                    <input className="input-row" name="event-field-unit-input" type="text" value={unit} disabled={true}/>
                            }
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