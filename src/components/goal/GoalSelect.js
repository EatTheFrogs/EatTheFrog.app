import React from 'react';
import '../../styles/Global.css';
import '../../styles/EventsPage.css';
import '../../styles/GoalsCreateModify.css'

export const GoalSelect = ({ goals, currentGoal,  newGoalSelected }) => {

    return (
        <div id="goal-select-container">
            <label id="goal-select-label" htmlFor="goal-select">Current Goal: </label>
            <select name="goal-select" id="goal-select" value={currentGoal?.id} onChange={newGoalSelected}>
                {
                    goals.map( goal => (
                        <option key={goal.id} value={goal.id}>{goal.name}</option>
                    ))
                }
            </select>
        </div>
    );
}