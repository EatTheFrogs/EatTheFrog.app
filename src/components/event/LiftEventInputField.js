import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { patchEventFieldRequest, deleteEventFieldRequest } from '../../client/AxiosClient';
import { LiftEventFieldSet } from './LiftEventFieldSet';
import { AppContext } from '../routing/SecureRoutes';

const initialLiftSet = {
    reps: 0,
    weight:0
}

export const LiftEventInputField = ({ index, field, event, setInitialLoad, setShowEventPopup }) => {

    const { setGoals, user, setIsLoading, setScrollable } = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [sets, setSets] = useState(field?.sets != null ? field?.sets : []);

    useEffect(() => {
        setSets(sets);
    }, [field]);

    const updateSetsForSet = (index, set) => {
        let setsList = sets.slice();
        setsList[index] = set;
        setSets(setsList);
    }

    const addLiftSetClicked = () => {
        let setsList = sets?.slice();
        setsList.push(initialLiftSet);
        setSets(setsList);
    }

    const saveLiftClicked = () => {
        let payload = {
            ...field,
            sets: sets
        }
        setIsLoading(true);
        patchEventFieldRequest(event.id, payload, user.accessToken)
            .then(response => {
                setSearchParams({
                    goal: event.goalId,
                    template: event.id
                });
                return response;
            })
            .then((response) => {
                setShowEventPopup(false);
                setInitialLoad(true);
                return response;
            })
            .then(response => setGoals(response))
            .then(() => setShowEventPopup(false))
            .then(() => setIsLoading(false));
    }

    const deleteLiftClicked = () => {
        setIsLoading(true);
        deleteEventFieldRequest(event.id, field.id, user.accessToken)
            .then(response => {
                setSearchParams({
                    goal: event.goalId,
                    template: event.id
                });
                return response;
            })
            .then((response) => {
                setShowEventPopup(false);
                setInitialLoad(true);
                return response;
            })
            .then(response => setGoals(response))
            .then(() => setShowEventPopup(false))
            .then(() => setIsLoading(false));
    }

    const deleteLiftSet = (index) => {
        console.log(`Deleteing Lift Set with index[${index}]`);
        console.log(`Current sets array:\n${JSON.stringify(sets)}`);
        let setsList = sets.slice();
        setsList.splice(index, 1);
        setSets(setsList);
    } 

    return (
        <div className="popup-input lift-dropdown light-grey">
            <div className="input-row-container lift-dropdown-inner">
                <button className="red" id="save-lift-button" onClick={deleteLiftClicked}>Delete Lift</button>
                <div className="liftsets-table-header">
                    <label className="input-row-label" htmlFor="liftset-reps-input">Reps:</label>
                    <label className="input-row-label" htmlFor="liftset-weight-input">Weight:</label>
                </div>
                <div className="liftsets-table">
                    {
                        sets?.map((set, index) => <LiftEventFieldSet key={index} index={index} edit={true} liftSet={set} updateSetsForSet={updateSetsForSet} deleteLiftSet={deleteLiftSet}/>)
                    }
                </div>
                <button className="light-black" id="add-liftset-button" onClick={addLiftSetClicked}>+ Add Lift Set</button>
                <button className="light-green" id="save-lift-button" onClick={saveLiftClicked}>Save Lift</button>
            </div>
        </div>
    )
}