import React, {useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SEARCH_PARAM_GOAL, SEARCH_PARAM_TEMPLATE } from '../config/GlobalVars';
import KermitPresenting from '../images/KermitPresenting.png';
import Plus from '../images/Plus.png';
import { AppContext } from '../components/routing/SecureRoutes';
import { getAllGoalsRequest } from '../client/AxiosClient';
import { Loading } from '../components/loading/Loading';
import { GoalSelect } from '../components/goal/GoalSelect';
import { EventLogCard } from '../components/event/EventLogCard';
import { EventPopup } from '../components/popup/EventPopup';
import '../styles/Global.css';
import '../styles/EventsPage.css';

export const EventsPage = () => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { goals, setGoals, user, isLoading, setIsLoading, setScrollable, setNavHovered } = useContext(AppContext);

    const getCurrentGoalId = () => {
        if(intitialLoad && searchParams.has(SEARCH_PARAM_GOAL) && findGoal(searchParams.get(SEARCH_PARAM_GOAL)) != null) {
            return searchParams.get(SEARCH_PARAM_GOAL);
        } else if(goals?.length > 0 ) {
            return goals[0].id;
        } else {
            return null;
        }
    }

    const findGoal = (goalId) => {
        return goals != null && goalId != null ? goals.find(goal => goal.id === goalId) : null;
    }

    const [intitialLoad, setInitialLoad] = useState(true);
    const [goalsExist, setGoalsExist] = useState(goals != null ? goals.length > 0 : false);
    const [currentGoalId, setCurrentGoalId] = useState(getCurrentGoalId());
    const [currentGoal, setCurrentGoal] = useState();
    const [completedEvents, setCompletedEvents] = useState(currentGoal?.completedEvents);
    const [currentEvent, setCurrentEvent] = useState();
    const [showEventPopup, setShowEventPopup] = useState(false);
    const [isNewEvent, setIsNewEvent] = useState(false);

    useEffect(() => {
        setScrollable(true);
        window.scrollTo(0, 0);
        setNavHovered(false);
    }, []);

    useEffect(() => {
        if(user != null) {
            setIsLoading(true);
            getAllGoalsRequest(user.uuid, user.accessToken)
                    .then(response => setGoals(response));
        }
    }, [user]);

    useEffect(() => {
        if(goals != null) {
            setIsLoading(false);
        }
        setGoalsExist(goals != null ? goals.length > 0 : false);
        setCurrentGoalId(getCurrentGoalId());
        setCurrentGoal(findGoal(currentGoalId));
    }, [goals]);

    useEffect(() => {
        setCurrentGoal(findGoal(currentGoalId));
    }, [currentGoalId]);

    useEffect(() => {
        setCompletedEvents(currentGoal?.completedEvents);
    }, [currentGoal]);

    useEffect(() => {
        if(showEventPopup) {
            window.scrollTo(0, 0);
        }
        setScrollable(!showEventPopup);
    }, [showEventPopup]);

    const newGoalSelected = (e) => {
        setInitialLoad(false);
        setCurrentGoalId(e.target.value);
    };

    const editGoalClicked = (e) => {
        navigate({
            pathname: '/goals',
            search: `${SEARCH_PARAM_GOAL}=${currentGoal.id}`
        });
    }

    const editGoalTemplateClicked = (templateId) => {
        navigate({
            pathname: '/goals',
            search: `${SEARCH_PARAM_GOAL}=${currentGoal.id}&${SEARCH_PARAM_TEMPLATE}=${templateId}`
        });
    }

    const addNewEvent = (e) => {
        setIsNewEvent(true);
        setShowEventPopup(true);
    }

    const viewExistingEvent = (event) => {
        setCurrentEvent(event);
        setIsNewEvent(false);
        setShowEventPopup(true);
    }

    return (
        <>
            {
                isLoading ?
                (
                    <Loading />
                )
                :
                (
                    <div className="page events-page frog-background">
                        <div className="page-header" id="goals-header-container">
                            <div id="chalkboard"></div>
                            {
                                goalsExist && currentGoal != null ?
                                    <>
                                        <div id="goal-select-prefix">My goal for today is...</div>
                                        <div id="edit-goal-container">
                                            <div id="edit-goal" onClick={editGoalClicked}>Edit Goal</div>
                                        </div>
                                        <div className="flex-column" id="current-goal-container">
                                            <div id="current-goal-container-text">
                                                <h2 id="current-goal-name">{currentGoal.name}</h2>
                                                <h4 id="current-goal-description">{currentGoal.description}</h4>
                                            </div>
                                        </div>
                                    </>
                                :    
                                    <div className="flex-column" id="current-goal-container">
                                        <div id="current-goal-container-text">
                                            <h2 id="current-goal-name">No Existing Goals...</h2>
                                            <h4 id="current-goal-description">Create goals using the 'Manage Goals' page</h4>
                                        </div>
                                    </div>
                            }
                            <img id="kermit-presenting" src={KermitPresenting} alt="Kermit the Frog pointing to current goal."/>
                        </div>
        
                        {
                            goalsExist ?
                                <div id="goal-input-log-container">
                                    {
                                        currentGoal != null ?
                                            <GoalSelect goals={goals} currentGoal={currentGoal} newGoalSelected={newGoalSelected}/>
                                        :    
                                            null
                                    }
                                    <div className="page-main" id="goal-input-log-inner" style={currentGoal != null ? {'gridTemplateColumns': `${((currentGoal.completedEvents.length + 2) / 2)}`}: null}>
                                        <div className="event-log-card flex-row add-goal-event-button" id="add-event-button" onClick={addNewEvent}>
                                            <img className="add-goal-event-button-plus-sign" src={Plus} alt="Plus sign"/>
                                            <p className="add-goal-event-button-label">Add New Event</p>
                                        </div>
                                        {   
                                            goalsExist && completedEvents != null ?
                                                completedEvents.map( event => (
                                                    <EventLogCard key={event.id} event={event} viewExistingEvent={viewExistingEvent}/>
                                                ))
                                            : 
                                                    null
                                        }
                                        {
                                            showEventPopup ?
                                                <EventPopup goal={currentGoal} event={currentEvent} isNewEvent={isNewEvent} 
                                                setShowEventPopup={setShowEventPopup} setInitialLoad={setInitialLoad} editGoalClicked={editGoalClicked} 
                                                editGoalTemplateClicked={editGoalTemplateClicked}/>
                                            :
                                                null
                                        }
                                    </div>
                                </div>  
                            :
                                <div id="no-goals-exist">
                                    <p id="no-goals-exist-link" onClick={() => navigate('/goals')}>Visit 'Manage Goals' page</p>
                                    <p>No goals created yet! Use the 'Create New Goal' tab on the 'Manage Goals' page to set up a new goal and event templates.</p>
                                </div>  
                        }
                        
                    </div>
                )
            }
        </>
    );
}