import React, {useEffect, useState, useContext} from 'react';
import { useSearchParams } from "react-router-dom";
import { MAX_GOAL_NAME_LENGTH, MAX_GOAL_DESCRIPTION_LENGTH, SEARCH_PARAM_GOAL, SEARCH_PARAM_TEMPLATE } from '../../config/GlobalVars';
import { patchGoalRequest, deleteGoalRequest } from '../../client/AxiosClient';
import KermitHole from '../../images/KermitHole.png';
import { AppContext } from '../routing//SecureRoutes';
import { EventTemplate } from '../eventTemplate/EventTemplate';
import { GoalSelect } from './GoalSelect';
import { EventTemplateSelect } from '../eventTemplate/EventTemplateSelect';
import { GoalNameDescription } from './GoalNameDescription';
import { AddEventTemplatePopup } from '../popup/AddEventTemplatePopup';
import { DeletePopup } from '../popup/DeletePopup';
import { GoalNameDescriptionPopup } from '../popup/GoalNameDescriptionPopup';
import '../../styles/GoalsCreateModify.css'

export const GoalsModify = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const getCurrentGoalId = (currGoals) => {
        if(intitialLoad && searchParams.has(SEARCH_PARAM_GOAL) && findGoal(searchParams.get(SEARCH_PARAM_GOAL), currGoals) != null) {
            return searchParams.get(SEARCH_PARAM_GOAL);
        } else if(currGoals?.length > 0 ) {
            return currGoals[0].id;
        } else {
            return null;
        }
    }

    const getCurrentTemplateId = (goal) => {
        if(intitialLoad && searchParams.has(SEARCH_PARAM_TEMPLATE) && findTemplate(searchParams.get(SEARCH_PARAM_TEMPLATE)) != null) {
            return searchParams.get(SEARCH_PARAM_TEMPLATE);
        } else if((goal?.eventTemplates != null) && (goal.eventTemplates.length > 0)) {
            return goal.eventTemplates[0].id;
        } else {
            return null;
        }
    }

    const findGoal = (goalId, currGoals) => {
        return goals != null && goalId != null ? currGoals.find(goal => goal.id === goalId) : null;
    }

    const findTemplate = (templateId, goal) => {
        return (currentGoal?.eventTemplates != null) && (currentGoal.eventTemplates.length > 0) ? currentGoal.eventTemplates.find(template => template.id === templateId) : null;
    }

    const { goals, setGoals, user, setIsLoading, setScrollable } = useContext(AppContext);

    const [intitialLoad, setInitialLoad] = useState(true);
    const [currentGoalId, setCurrentGoalId] = useState(getCurrentGoalId(goals));
    const [currentGoal, setCurrentGoal] = useState();
    const [currentTemplateId, setCurrentTemplateId] = useState(getCurrentTemplateId(currentGoal));
    const [currentTemplate, setCurrentTemplate] = useState();
    const [goalName, setGoalName] = useState("");
    const [goalDescription, setGoalDescription] = useState("");
    const [editGoalNameDescription, setEditGoalNameDescription] = useState(false);
    const [showEventTemplatePopup, setShowEventTemplatePopup] = useState(false);
    const [editedGoalValid, setEditedGoalValid] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    useEffect(() => {
        setCurrentGoalId(getCurrentGoalId(goals));
    }, [goals]);

    useEffect(() => {
        setCurrentGoal(findGoal(currentGoalId, goals));
    }, [currentGoalId]);

    useEffect(() => {
        setCurrentTemplate(findTemplate(currentTemplateId, currentGoal));
    }, [currentTemplateId]);

    useEffect(() => {
        if(currentGoal != null) {
            setGoalName(currentGoal.name);
            setGoalDescription(currentGoal.description);
            setIsLoading(false);
            setCurrentTemplateId(getCurrentTemplateId(currentGoal));
        }
    }, [currentGoal]);

    useEffect(() => {
        setScrollable(!(editGoalNameDescription || showEventTemplatePopup || showDeletePopup));
    }, [editGoalNameDescription, showEventTemplatePopup, showDeletePopup]);

    useEffect(() => {
        validateEditedGoal()
    }, [goalName, goalDescription]);

    const editGoalClicked = (e) => {
        e.preventDefault();
        setEditGoalNameDescription(true);
    }

    const validateEditedGoal = () => {
        let goalNameValid = goalName.length > 0 && goalName.length <= MAX_GOAL_NAME_LENGTH;
        let goalDescriptionValid = goalDescription.length > 0 && goalDescription.length <= MAX_GOAL_DESCRIPTION_LENGTH;
        let changesMade = goalName !== currentGoal?.name || goalDescription !== currentGoal?.description;
        setEditedGoalValid(changesMade && goalNameValid && goalDescriptionValid);
    }

    const cancelEditGoalClicked = (e) => {
        e.preventDefault();
        setGoalName(currentGoal.name);
        setGoalDescription(currentGoal.description);
        setEditGoalNameDescription(false);
    }

    const deleteGoalClicked = () => {
        setShowDeletePopup(true)
    }

    const deleteGoal = (e) => {
        e.preventDefault();
        setIsLoading(true);
        deleteGoalRequest(currentGoal.id, user.accessToken)
            .then(response => setGoals(response))
            .then(() => setEditGoalNameDescription(false));
    }

    const saveGoalNameDescriptionChange = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSearchParams({
            goal: currentGoalId
        });
        let updatedGoal = {
            ...currentGoal,
            "name": goalName,
            "description": goalDescription
        }
        patchGoalRequest(updatedGoal, user.accessToken)
            .then(response => setGoals(response))
            .then(() => setEditGoalNameDescription(false));
    }

    const addEventTemplate = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        setShowEventTemplatePopup(true);
    }

    const newGoalSelected = (e) => {
        setInitialLoad(false);
        setCurrentGoalId(e.target.value);
    };

    const newTemplateSelected = (e) => {
        setInitialLoad(false);
        setCurrentTemplateId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Goal submitted.`);
    };

    return (
        goals?.length > 0 ?
            <>
                <div className="create-modify-section padding-bottom-1rem">
                    <GoalSelect goals={goals} currentGoal={currentGoal} newGoalSelected={newGoalSelected}/>
                </div>
                <div className="create-modify-section grey-white">
                    <form id="goal-input-container" onSubmit={handleSubmit}>
                        <div className="edit-goal-buttons flex-row">
                            <button className="edit-goal-button red" onClick={deleteGoalClicked}>Delete Goal</button>
                            <button className="edit-goal-button grey" onClick={editGoalClicked}>Edit Goal Name / Description</button>
                        </div>
                        <GoalNameDescription goalName={goalName} setGoalName={setGoalName} goalDescription={goalDescription} setGoalDescription={setGoalDescription}/>
                        {
                            editGoalNameDescription ?
                                <GoalNameDescriptionPopup goalName={goalName} setGoalName={setGoalName} goalDescription={goalDescription} 
                                    setGoalDescription={setGoalDescription} editedGoalValid={editedGoalValid} validateEditedGoal={validateEditedGoal} 
                                    saveChanges={saveGoalNameDescriptionChange} cancelEditGoalClicked={cancelEditGoalClicked}/>
                            :
                                null
                        }
                    </form>
                </div>
                <div className="create-modify-section create-modify-section-bottom light-grey">
                    <div id="event-config-header">
                        <p id="event-config-header-title">Event Configuration</p>
                        <p id="event-config-header-description">In order to track progress for your goals, you will need to create events. Setting up reusable event templates here will make the process of logging completed events much easier! Configure event templates below with whatever fields you deem necesary. E.g., if your goal is running you may want to create an "Outdoor Run" template with a "distance" field of type "number" and a "time" field of type "duration".</p>
                    </div>
                    <button id="add-event-template-button" className="light-black" onClick={addEventTemplate}>+ Add New Event Template</button>
                    {
                        (currentGoal?.eventTemplates != null) && (currentGoal.eventTemplates.length > 0) && (currentTemplateId != null) ?
                            <EventTemplateSelect eventTemplates={currentGoal.eventTemplates} currentTemplateId={currentTemplateId}  newTemplateSelected={newTemplateSelected}/>
                        :
                            null
                    }
                </div>
                <div className="create-modify-section create-modify-section-bottom padding-bottom-1rem light-grey">
                    {
                        currentTemplate != null ?
                            <EventTemplate key={currentTemplateId} eventTemplate={currentTemplate}/>
                        :
                            null
                    }
                    {
                        showEventTemplatePopup ?
                        (
                            <AddEventTemplatePopup goal={currentGoal} setShowEventTemplatePopup={setShowEventTemplatePopup}/>
                        )
                        :
                            null
                    }
                </div>
                {
                    showDeletePopup ? 
                        <DeletePopup deleteMessage={"Are you sure you want to delete this goal? All associated events and template will be deleted as well."} cancelCallback={() => setShowDeletePopup(false)} deleteCallback={deleteGoal}/>
                    :
                        null
                }
            </>
        :
            <div className="create-modify-section create-modify-section-bottom padding-bottom-1rem">
                <img className='kermit-png' src={KermitHole} alt="Kermit the Frog busting through hole in the wall."/>
                <p>No goals created yet! Click the 'Create New Goal' tab above to start creating your first goal.</p>
            </div>
    )
}