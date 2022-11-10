import React, {useState, useContext} from 'react';
import { GoalNameDescription } from './GoalNameDescription';
import { postGoalRequest, postGoalObject } from '../../client/AxiosClient';
import { AppContext } from '../routing/SecureRoutes';
import '../../styles/GoalsCreateModify.css'

export const GoalsCreate = () => {
    const { setGoals, user, setIsLoading } = useContext(AppContext);
    const [goalName, setGoalName] = useState(``);
    const [goalDescription, setGoalDescription] = useState(``);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(goalName.length === 0 || goalDescription.length === 0) {
            console.log("No request sent - goal name or description was null");
        }
        setIsLoading(true);
        postGoalRequest(postGoalObject( user.uuid, goalName, goalDescription), user.accessToken)
            .then(response => setGoals(response))
            .then(() => setIsLoading(false));
    };

    return (
        <>
            <form className="create-modify-section" id="goal-input-container" onSubmit={handleSubmit}>
                <GoalNameDescription editGoal={true} goalName={goalName} setGoalName={setGoalName} goalDescription={goalDescription} setGoalDescription={setGoalDescription}/>
                <input id="goal-input-submit" className="input-row green" type="submit" value="Save Goal" disabled={goalName.length === 0 || goalDescription.length === 0}/>
            </form>
            <div id="create-goal-instructions-container">
                <p id="create-goal-instructions">Once your new goal is created, head over to the "Modify Goals" tab to setup some event templates!</p>
            </div>
        </>
    );
}