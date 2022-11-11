import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import { DEFAULT_TYPE, LIFT_TYPE, SEARCH_PARAM_LIFT } from '../../config/GlobalVars';
import { postEventRequest, patchEventRequest, deleteEventRequest, deleteEventFieldRequest } from '../../client/AxiosClient';
import KermitSad from '../../images/KermitSad.png';
import KermitLift from '../../images/KermitLift.png';
import { AppContext } from '../routing/SecureRoutes';
import { DefaultEventInputField } from './DefaultEventInputField';
import { useSearchParams } from 'react-router-dom';
import { LiftSelect } from './LiftSelect';
import { LiftEventAddLiftPopup } from '../popup/LiftEventAddLiftPopup';
import { DeletePopup } from '../popup/DeletePopup';
import { AddEventFieldPopup } from '../popup/AddEventFieldPopup';

export const EventInput = ({ event, setEdit, setShowEventPopup, setInitialLoad, isNewEvent, editGoalTemplateClicked, currentTemplateId }) => {

    const { user, setGoals, setIsLoading, setScrollable } = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const getInitialFields = () => {
        return event?.fields != null ? event?.fields.slice() : [];
    }

    const getInitialDate = () => {
        return event?.completedDate != null ? new Date(Date.parse(event.completedDate)) : new Date();
    }

    const convertToISODate =(date) => {
        return date.toISOString()
    }

    const getLiftId = () => {
        if(intitialLiftLoad && searchParams.has(SEARCH_PARAM_LIFT)) {
            return searchParams.get(SEARCH_PARAM_LIFT);
        } else {
            return (event?.fields != null && event?.fields?.length > 0) ? event?.fields[0].id : null;
        }
    }

    const getLift = () => {
        return (event?.fields != null && event?.fields?.length > 0) ? event?.fields[liftId] : null;
    }

    const [intitialLiftLoad, setIntitialLiftLoad] = useState(true);
    const [fields, setFields] = useState(getInitialFields());
    const [completedDate, setCompletedDate] = useState(getInitialDate());
    const [liftId, setLiftId] = useState(getLiftId());
    const [lift, setLift] = useState(getLift());
    const [showAddFieldPopup, setShowAddFieldPopup] = useState(false);
    const [showAddLiftPopup, setShowAddLiftPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    useEffect(() => {
        console.log(`EventInput Event: ${JSON.stringify(event)}`)
        setFields(getInitialFields);
        setCompletedDate(getInitialDate());
    }, [event]);

    useEffect(() => {
        console.log(`Event: ${JSON.stringify(event)}`)
        console.log(`Fields: ${JSON.stringify(fields)}`)
    }, [fields]);

    useEffect(() => {
        setLift(getLift());
    }, [liftId]);

    const updateValueForIndex = (index, fieldValue) => {
        let updatedFields = fields.slice();
        updatedFields[index].value = fieldValue;
        setFields(updatedFields);
    }

    const updateDurationForIndex = (index, fieldDuration) => {
        if(fieldDuration == null) return;
        let updatedFields = fields.slice();
        updatedFields[index].duration = fieldDuration;
        setFields(updatedFields);
    }

    const saveEventClicked = (e) => {
        let request = event.id == null ? postEventRequest : patchEventRequest;
        let payload = {
            ...event,
            completedDate: convertToISODate(completedDate),
            fields: fields
        }
        console.log(`Saving Event:\n${JSON.stringify(payload)}`);
        setIsLoading(true);
        setSearchParams({
            goal: event.goalId
        });
        request(payload, user.accessToken)
            .then(response => {
                setSearchParams({
                    goal: event.goalId
                });
                return response;
            })
            .then((response) => {
                setInitialLoad(true);
                return response;
            })
            .then((response) => setGoals(response))
            .then(() => setScrollable(true))
            .then(() => setShowEventPopup(false))
            .then(() => setIsLoading(false));
    }

    const cancelClick = (e) => {
        setEdit(false);
        setScrollable(true);
        setShowEventPopup(false);
    }

    const editEventClicked = (e) => {
        setEdit(true);
    }

    const newLiftSelected = (e) => {
        setIntitialLiftLoad(false);
        setLiftId(e.target.value);
    }

    const getLiftField = (currLiftId) => {
        return fields?.find(field => field.id === currLiftId);
    }

    const addFieldClicked = (e) => {
        setShowAddFieldPopup(true);
    }

    const addLiftClicked = (e) => {
        setShowAddLiftPopup(true);
    }

    const deleteEventClicked = (e) => {
        setIsLoading(true);
        deleteEventRequest(event.id, user.accessToken)
            .then(response => {
                setSearchParams({
                    goal: event.goalId
                });
                return response;
            })
            .then((response) => {
                setInitialLoad(true);
                return response;
            })
            .then((response) => setGoals(response))
            .then(() => setScrollable(true))
            .then(() => setShowDeletePopup(false))
            .then(() => setShowEventPopup(false))
            .then(() => setIsLoading(false));
    }

    const deleteEventFieldClicked = (fieldId) => {

        if(isNewEvent) {
            let updatedFields = fields.slice().filter(field => field.id !== fieldId);
            setFields(updatedFields);
            return;
        }

        setIsLoading(true);
        deleteEventFieldRequest(event.id, fieldId, user.accessToken)
            .then(response => {
                setSearchParams({
                    goal: event.goalId
                });
                return response;
            })
            .then((response) => {
                setInitialLoad(true);
                return response;
            })
            .then((response) => setGoals(response))
            .then(() => setScrollable(true))
            .then(() => setShowEventPopup(false))
            .then(() => setIsLoading(false));
    }

    const addField = (newField) => {
        let updatedFields = fields.slice();
        updatedFields.push(newField);
        setFields(updatedFields);
    }

    return (
        <>
            {
                isNewEvent && event.type === LIFT_TYPE ?
                (
                    isNewEvent && event.fields.length === 0 ?
                    <>
                        <div className="no-templates-warning">
                            <img className='kermit-sad' src={KermitSad} alt="Kermit the Frog face palming."/>
                            <p>Invalid template detected! Before you can log completed events, you must use the 'Manage Goals' page to create a template with valid fields</p>
                            <div className="popup-buttons flex-row">
                                <button className="popup-button red" onClick={cancelClick}>Cancel</button>
                                <button className="popup-button grey" onClick={() => editGoalTemplateClicked(currentTemplateId)}>Manage Template</button>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <img className='kermit-lift' src={KermitLift} alt="Kermit the Frog with massive muscles."/>
                        <p>In order to log lifting events, first create an empty event using the 'Save Event' button here then edit <i>and save</i>  the created event as you progress through the lift</p>
                    </>
                )
                :
                <>
                    <div className="input-row-container">
                        <label className="input-row-label" id="date-label" htmlFor="date-picker">Date:</label>
                        <div className="date-picker">
                            <DatePicker value={completedDate} onChange={setCompletedDate}/>
                        </div>
                    </div>
                    {
                        event.type === LIFT_TYPE ?
                        <>
                            <button className="popup-button dark-black" id="add-lift-button" onClick={addLiftClicked}>+ Add Lift</button>
                            <LiftSelect event={event} liftEventFields={fields} currentLiftId={liftId} 
                                newLiftSelected={newLiftSelected} setInitialLoad={setInitialLoad}
                                setShowEventPopup={setShowEventPopup}/>
                        </> 
                        : null
                    }
                </>
            }
            {
                event.type === DEFAULT_TYPE ?
                <>
                {
                    fields?.map((field, index) => 
                        <DefaultEventInputField key={index} index={index} field={field} updateValueForIndex={updateValueForIndex} 
                            updateDurationForIndex={updateDurationForIndex} deleteEventFieldClicked={deleteEventFieldClicked}/>
                    )
                }
                    <button className="popup-button dark-black" id="add-lift-button" onClick={addFieldClicked}>+ Add Field</button>
                </>
                : null 
            }
            {
                !isNewEvent || (isNewEvent && (event.type === DEFAULT_TYPE || event?.fields?.length !== 0)) ?
                <div className="popup-buttons flex-row">
                    {
                        isNewEvent ?
                            <button className="popup-button light-grey" onClick={cancelClick}>Cancel</button>
                        :
                            <button className="popup-button red" onClick={() => setShowDeletePopup(true)}>Delete Event</button>
                    }
                    <button className="popup-button light-green" onClick={saveEventClicked}>{!isNewEvent && event.type === LIFT_TYPE ? 'Save Date Change' : 'Save Event'}</button>
                    
                </div>
                :
                null
            }
            {
                showAddFieldPopup ?
                    <AddEventFieldPopup eventId={event.id} templateId={currentTemplateId} goalId={event.goalId} setShowEventPopup={setShowEventPopup} setShowAddFieldPopup={setShowAddFieldPopup} isNewEvent={isNewEvent} addField={addField}/>
                :
                    null
            }
            {
                showAddLiftPopup ?
                    <LiftEventAddLiftPopup liftEvent={event} setShowAddLiftPopup={setShowAddLiftPopup} setIntitialLiftLoad={setIntitialLiftLoad} setShowEventPopup={setShowEventPopup}/>
                :
                    null
            }
            {
                showDeletePopup ? 
                    <DeletePopup deleteMessage={"Are you sure you want to delete this event?"} cancelCallback={() => setShowDeletePopup(false)} deleteCallback={deleteEventClicked}/>
                :
                    null
            }
        </>
    );
}