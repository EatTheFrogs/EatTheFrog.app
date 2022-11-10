import React, { useEffect, useState, useContext } from 'react';
import { useSearchParams } from "react-router-dom";
import { MAX_EVENTTEMPLATE_NAME_LENGTH } from '../../config/GlobalVars';
import { patchEventRequest } from '../../client/AxiosClient';
import { AppContext } from '../routing/SecureRoutes';
import '../../styles/GoalsCreateModify.css'

export const LiftEventAddLiftPopup = ({ liftEvent, setShowAddLiftPopup, setIntitialLiftLoad, setShowEventPopup }) => {

    const { setGoals, user, setIsLoading } = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [newLiftName, setNewLiftName] = useState("");
    const [valid, setValid] = useState(false);

    useEffect(() => {
        validateFields();
    }, [newLiftName]);

    const validateFields = () => {
        setValid(newLiftName?.length > 0 && newLiftName?.length <= MAX_EVENTTEMPLATE_NAME_LENGTH);
    }

    const onNameChange = (e) => {
        if(e.target.value.length > MAX_EVENTTEMPLATE_NAME_LENGTH) {
            e.target.value = e.target.value.substring(0, MAX_EVENTTEMPLATE_NAME_LENGTH);
        } 
        setNewLiftName(e.target.value);
    }

    const getNewLiftId = (updatedGoals) => {
        let currGoal = updatedGoals.find(updatedGoal => updatedGoal.id === liftEvent.goalId);
        let currEvent = currGoal.completedEvents.find(updatedEvent => updatedEvent.id === liftEvent.id);
        let newLift = currEvent.fields.find(updatedField => !(liftEvent.fields.find(oldEvent => oldEvent.id === updatedField.id)));
        return newLift != null ? newLift.id : "";
    }

    const saveFieldClicked = (e) => {
        e.preventDefault();
        let newLift = {
            name: newLiftName,
            sets:[{
                reps: 0,
                weight: 0
            }]
        }
        let payload = {...liftEvent};
        payload.fields.push(newLift);
        setIsLoading(true);
        patchEventRequest(payload, user.accessToken)
            .then(response => {
                setSearchParams({
                    goal: liftEvent.goalId,
                    template: liftEvent.id,
                    lift: getNewLiftId(response)
                });
                return response;
            })
            .then((response) => {
                setIntitialLiftLoad(true);
                return response;
            })
            .then(response => setGoals(response))
            .then(() => setShowAddLiftPopup(false))
            .then(() => setShowEventPopup(false))
            .then(() => setIsLoading(false));
    }

    const cancelClick = (e) => {
        setShowAddLiftPopup(false);
    }

    const stopClickPropagation = (e) => {
        e.stopPropagation();
    }
    
    return (
        <div className="popup-container-background-2" onClick={cancelClick}>
            <div className="popup-container-2" onClick={stopClickPropagation}>
                <p className="popup-header">Add Lift</p>
                <div className="popup-input">
                    <div className="input-row-container">
                        <label className="input-row-label" htmlFor="event-field-name-input">Lift Name:</label>
                        <p className="input-row-restraint">* {MAX_EVENTTEMPLATE_NAME_LENGTH} characters max ({newLiftName?.length}/{MAX_EVENTTEMPLATE_NAME_LENGTH})</p> 
                        <input className="input-row" name="event-field-name-input" type="text" placeholder="Lift Name" value={newLiftName} onChange={e => onNameChange(e)}/>
                    </div>
                    <div className="popup-buttons flex-row">
                        <button className="popup-button red" onClick={cancelClick}>Cancel</button>
                        <button className="popup-button light-green" onClick={saveFieldClicked} disabled={!valid}>Save New Lift</button>
                    </div>
                </div>
            </div>
        </div>
    );
}