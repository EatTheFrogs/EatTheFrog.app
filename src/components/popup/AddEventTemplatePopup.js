import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { DEFAULT_TYPE, LIFT_TYPE, MAX_EVENTTEMPLATE_NAME_LENGTH } from '../../config/GlobalVars';
import { AppContext } from '../routing/SecureRoutes';
import { postEventTemplateRequest, postDefaultEventTemplateObject, postLiftEventTemplateObject } from '../../client/AxiosClient';
import '../../styles/Global.css';
import '../../styles/GoalsPage.css';

export const AddEventTemplatePopup = ( { goal, setShowEventTemplatePopup } ) => {

    const { setGoals, user, setIsLoading, setScrollable } = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [templateName, setTemplateName] = useState("");
    const [templateType, setTemplateType] = useState(DEFAULT_TYPE);
    const [validTemplate, setValidTemplate] = useState(false);

    const onTemplateNameChange = (e) => {
        if(e.target.value.length > MAX_EVENTTEMPLATE_NAME_LENGTH) {
            e.target.value = e.target.value.substring(0, MAX_EVENTTEMPLATE_NAME_LENGTH);
        } 
        setTemplateName(e.target.value);
    }

    const validateTemplate = () => {
        setValidTemplate(templateName.length > 0 && templateName.length <= MAX_EVENTTEMPLATE_NAME_LENGTH);
    }

    useEffect(() => {
        validateTemplate();
    }, [templateName]);

    const getNewTemplateId = (updatedGoals) => {
        let currGoal = updatedGoals.find(updatedGoal => updatedGoal.id === goal.id);
        let newTemplate = currGoal.eventTemplates.find(updatedTemplate => !(goal.eventTemplates.find(oldTemplate => oldTemplate.id === updatedTemplate.id)));
        return newTemplate != null ? newTemplate.id : "";
    }

    const changeTemplateType = (e) => {
        setTemplateType(e.target.value);
    };

    const createEventTemplate = (e) => {
        e.preventDefault();
        let payload = templateType === DEFAULT_TYPE ? postDefaultEventTemplateObject(goal.userUuid, goal.id, templateName, []) : postLiftEventTemplateObject(goal.userUuid, goal.id, templateName, []);
        console.log("Creating EventTemplate");
        setIsLoading(true);
        setSearchParams({
            goal: goal.id
        });
        postEventTemplateRequest(payload, user.accessToken)
            .then(response => {
                setSearchParams({
                    goal: goal.id,
                    template: getNewTemplateId(response)
                });
                return response;
            })
            .then((response) => setGoals(response))
            .then(() => setScrollable(true))
            .then(() => setShowEventTemplatePopup(false))
            .then(() => setIsLoading(false));
    }

    const cancelClick = (e) => {
        setScrollable(true);
        setShowEventTemplatePopup(false);
    }

    const stopClickPropagation = (e) => {
        e.stopPropagation();
    }

    return (
        <div className="popup-container-background" onClick={cancelClick}>
            <div className="popup-container" onClick={stopClickPropagation}>
                <div className="popup-container-inner">
                    <p className="popup-header">Add Event Template</p>
                    <div className="popup-input">
                        <div className="input-row-container">
                            <label className="input-row-label" htmlFor="goal-name-input">Template Name:</label>
                            <p className="input-row-restraint">* {MAX_EVENTTEMPLATE_NAME_LENGTH} characters max ({templateName?.length}/{MAX_EVENTTEMPLATE_NAME_LENGTH})</p> 
                            <input className="input-row" name="template-name-input" type="text" placeholder="E.g., Outdoor Run" value={templateName} onChange={e => onTemplateNameChange(e)}/>
                        </div>
                        <div className="type-container flex-row">
                            <label className="input-row-label type-select-label" htmlFor="template-type-select">Event Template Type: </label>
                            <select name="template-type-select" className="type-select" value={templateType} onChange={changeTemplateType}>
                                <option value={DEFAULT_TYPE}>{DEFAULT_TYPE}</option>
                                <option value={LIFT_TYPE}>{LIFT_TYPE}</option>
                            </select>
                        </div>
                        <div id="template-type-details-container" className="flex-column">
                            <p className="template-type-details"><b>Default: </b> Basic template that can be used for any type of goal</p>
                            <p className="template-type-details"><b>Lift: </b> Custom template made specifically for recording lifting sessions</p>
                        </div>
                        <div className="popup-buttons flex-row">
                            <button className="popup-button red" onClick={cancelClick}>Cancel</button>
                            <button className="popup-button light-green" onClick={createEventTemplate} disabled={!validTemplate}>Save Template</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}