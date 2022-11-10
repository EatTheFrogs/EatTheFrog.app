import React from 'react';
import { MAX_GOAL_NAME_LENGTH, MAX_GOAL_DESCRIPTION_LENGTH } from '../../config/GlobalVars';
import '../../styles/GoalsCreateModify.css'

export const GoalNameDescriptionPopup = ({ goalName, setGoalName, goalDescription, setGoalDescription, cancelEditGoalClicked, saveChanges, editedGoalValid }) => {

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

    const stopClickPropagation = (e) => {
        e.stopPropagation();
    }

    return (
        <div className="popup-container-background" onClick={cancelEditGoalClicked}>
            <div className="popup-container" onClick={stopClickPropagation}>
                <div className="popup-container-inner">
                    <div className="input-row-container">
                        <label className="input-row-label" htmlFor="goal-name-input">Goal Name:</label>
                        <p className="input-row-restraint">* {MAX_GOAL_NAME_LENGTH} characters max ({goalName?.length}/{MAX_GOAL_NAME_LENGTH})</p> 
                        <input className="input-row" name="goal-name-input" type="text" placeholder="E.g., Run" value={goalName} onChange={e => onGoalNameChange(e)}/>
                    </div>
                    <div className="input-row-container">
                        <label className="input-row-label" htmlFor="goal-description-input">Description:</label>
                        <p className="input-row-restraint">* {MAX_GOAL_DESCRIPTION_LENGTH} characters max ({goalDescription?.length}/{MAX_GOAL_DESCRIPTION_LENGTH})</p>       
                        <input className="input-row" name="goal-description-input" type="text" placeholder="E.g., Train for half marathon" value={goalDescription} onChange={e => onGoalDescriptionChange(e)}/>
                    </div>
                    <div className="edit-goal-buttons flex-row">
                        <button className="edit-goal-button grey" onClick={cancelEditGoalClicked}>Cancel</button>
                        <button className="edit-goal-button light-green" onClick={saveChanges} disabled={!editedGoalValid}>Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}