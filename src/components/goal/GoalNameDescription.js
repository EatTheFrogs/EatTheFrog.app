import React from 'react';
import { MAX_GOAL_NAME_LENGTH, MAX_GOAL_DESCRIPTION_LENGTH } from '../../config/GlobalVars';
import '../../styles/GoalsCreateModify.css'

export const GoalNameDescription = ({ editGoal, goalName, setGoalName, goalDescription, setGoalDescription }) => {

    const onGoalNameChange = (e) => {
        if(e.target.value.length > MAX_GOAL_NAME_LENGTH) {
            e.target.value = e.target.value.substring(0, MAX_GOAL_NAME_LENGTH);
        }
        setGoalName(e.target.value);
    }

    const onGoalDescriptionChange = (e) => {
        if(e.target.value.length > MAX_GOAL_DESCRIPTION_LENGTH) {
            e.target.value = e.target.value.substring(0, MAX_GOAL_DESCRIPTION_LENGTH);
        } 
        setGoalDescription(e.target.value);
    }

    return (
        <>
            <div className="input-row-container">
                <label className="input-row-label" htmlFor="goal-name-input">Goal Name:</label>
                <input className="input-row" name="goal-name-input" type="text" placeholder="E.g., Run" value={goalName} onChange={e => onGoalNameChange(e)} disabled={!editGoal}/>
            </div>
            <div className="input-row-container">
                <label className="input-row-label" htmlFor="goal-description-input">Description:</label>
                <input className="input-row" name="goal-description-input" type="text" placeholder="E.g., Train for half marathon" value={goalDescription} onChange={e => onGoalDescriptionChange(e)} disabled={!editGoal}/>
            </div>
        </>
    );
}