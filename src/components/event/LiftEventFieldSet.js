import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../routing/SecureRoutes';
import '../../styles/GoalsCreateModify.css'

// {
//     "reps": 10,
//     "weight": 135
// }

export const LiftEventFieldSet = ({ index, edit, liftSet, updateSetsForSet, deleteLiftSet }) => {

    const { setGoals, user, setIsLoading, setScrollable } = useContext(AppContext);
    const [reps, setReps] = useState(liftSet.reps);
    const [weight, setWeight] = useState(liftSet.weight);

    useEffect(() => {
        setReps(liftSet.reps);
        setWeight(liftSet.weight);
    }, [liftSet]);

    useEffect(() => {
        updateSetsForSet(index, {
            ...liftSet,
            reps: reps,
            weight: weight
        });
    }, [reps, weight]);

    const onRepsChange = (e) => {
        if(!validateNumberInput(e.target.value)) {
            e.target.value = e.target.value.substring(0, e.target.value.length-1);
        } 
        setReps(e.target.value.trim());
    }

    const onWeightChange = (e) => {
        if(!validateNumberInput(e.target.value)) {
            e.target.value = e.target.value.substring(0, e.target.value.length-1);
        } 
        setWeight(e.target.value.trim());
    }

    const validateNumberInput = (input) => {
        return input != null && input.trim().length > 0 && !isNaN(input) && Number.isInteger(Number(input));
    }

    const deleteThisLiftSet = (e) => {
        deleteLiftSet(index);
    } 


    return (
        <div className="liftsets-table-row">
            <div className="input-row-container">
                <input className="input-row" name="liftset-reps-input" type="text" placeholder="number" value={reps} onChange={e => onRepsChange(e)} disabled={!edit}/>
            </div>
            <div className="input-row-container">
                <input className="input-row" name="liftset-weight-input" type="text" placeholder="number" value={weight} onChange={e => onWeightChange(e)} disabled={!edit}/>
            </div>
            <button className="liftsets-table-row-delete-button red" onClick={deleteThisLiftSet}>X</button>
        </div>
    );
}