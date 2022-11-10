import React, { useState, useContext, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { MAX_EVENTTEMPLATE_FIELD_NAME_LENGTH } from '../../config/GlobalVars';
import { postEventTemplateFieldRequest, patchEventTemplateFieldRequest } from '../../client/AxiosClient';
import { LiftEventFieldSet } from '../event/LiftEventFieldSet'
import { AppContext } from '../routing/SecureRoutes';
import '../../styles/GoalsCreateModify.css'

const initialLiftSet = {
    reps: 0,
    weight:0
}

export const LiftEventTemplateFieldPopup = ({ eventField, templateId, goalId, setShowTemplateFieldPopup }) => {

    const { setGoals, user, setIsLoading, setScrollable } = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [name, setName] = useState(eventField.name);
    const [sets, setSets] = useState(eventField.sets);
    const [valid, setValid] = useState(false);

    useEffect(() => {
        setName(eventField.name);
        setSets(eventField.sets);
    }, [eventField]);

    useEffect(() => {
        validateFields();
    }, [name, sets]);

    useEffect(() => {
        console.log(`Sets array updated:\n${JSON.stringify(sets)}`);
    }, [sets]);

    const validateFields = () => {
        let validName = name.length > 0 && name.length <= MAX_EVENTTEMPLATE_FIELD_NAME_LENGTH;
        setValid(validName);
    }

    const onNameChange = (e) => {
        if(e.target.value.length > MAX_EVENTTEMPLATE_FIELD_NAME_LENGTH) {
            e.target.value = e.target.value.substring(0, MAX_EVENTTEMPLATE_FIELD_NAME_LENGTH);
        } 
        setName(e.target.value);
    }

    const onSetsChange = (e) => {
        setSets(e.target.value);
    }

    const saveFieldClicked = (e) => {
        e.preventDefault();
        let payload = {
            ...eventField,
            "name": name,
            "sets": sets
        };
        setIsLoading(true);
        let promise = eventField.id == null ? postEventTemplateFieldRequest(templateId, payload, user.accessToken) : patchEventTemplateFieldRequest(templateId, payload, user.accessToken)
        promise
            .then(response => {
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

    const addLiftSetClicked = () => {
        let setsList = sets.slice();
        setsList.push(initialLiftSet);
        setSets(setsList);
    }

    const deleteLiftSet = (index) => {
        console.log(`Deleteing Lift Set with index[${index}]`);
        console.log(`Current sets array:\n${JSON.stringify(sets)}`);
        let setsList = sets.slice();
        setsList.splice(index, 1);
        setSets(setsList);
    } 

    const updateSetsForSet = (index, set) => {
        let setsList = sets.slice();
        setsList[index] = set;
        console.log(`Updating sets array:\n${JSON.stringify(setsList)}`);
        setSets(setsList);
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
                    <p className="popup-header">Edit Lift</p>
                    <div className="popup-input">
                        <div className="input-row-container">
                            <label className="input-row-label" htmlFor="event-field-name-input">Lift Name:</label>
                            <p className="input-row-restraint">* {MAX_EVENTTEMPLATE_FIELD_NAME_LENGTH} characters max ({name?.length}/{MAX_EVENTTEMPLATE_FIELD_NAME_LENGTH})</p> 
                            <input className="input-row" name="event-field-name-input" type="text" placeholder="Lift Name" value={name} onChange={e => onNameChange(e)}/>
                        </div>
                        {
                            sets?.length ?
                            (
                                <div className="liftsets-table">
                                    <div className="liftsets-table-header liftsets-table-row">
                                        <label className="input-row-label" htmlFor="liftset-reps-input">Reps:</label>
                                        <label className="input-row-label" htmlFor="liftset-weight-input">Weight:</label>
                                    </div>
                                    {
                                        sets.map((set, index) => <LiftEventFieldSet key={index} index={index} edit={true} liftSet={set} updateSetsForSet={updateSetsForSet} deleteLiftSet={deleteLiftSet}/>)
                                    }
                                </div>
                            )
                            :
                                null
                        }
                        <button className="light-black" id="add-liftset-button" onClick={addLiftSetClicked}>+ Add Lift Set</button>
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