import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { LIFT_TYPE } from '../../config/GlobalVars';
import KermitSad from '../../images/KermitSad.png';
import { AppContext } from '../routing/SecureRoutes';
import { EventTemplateSelect } from '../eventTemplate/EventTemplateSelect';
import { EventInput } from '../event/EventInput';
import '../../styles/Global.css';
import '../../styles/GoalsPage.css';

export const EventPopup = ( { goal, event, isNewEvent, setShowEventPopup, setInitialLoad, editGoalClicked, editGoalTemplateClicked } ) => {

    const { setGoals, user, setIsLoading, setScrollable } = useContext(AppContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const getCurrentTemplateId = (goal) => {
        if((goal?.eventTemplates != null) && (goal.eventTemplates.length > 0)) {
            return goal.eventTemplates[0].id;
        } else {
            return null;
        }
    }

    const getCurrentEvent = () => {
        if(isNewEvent) {
            let newEvent = {
                ...currentTemplate
            };
            delete newEvent.id;
            return newEvent;
        } else {
            return event;
        }
    }

    const findTemplate = (templateId,) => {
        return (goal?.eventTemplates != null) && (goal.eventTemplates.length > 0) ? goal.eventTemplates.find(template => template.id === templateId) : null;
    }

    const [currentTemplateId, setCurrentTemplateId] = useState(getCurrentTemplateId(goal));
    const [currentTemplate, setCurrentTemplate] = useState();
    const [currentEvent, setCurrentEvent] = useState();
    const [edit, setEdit] = useState(isNewEvent);


    useEffect(() => {
        setCurrentTemplateId(getCurrentTemplateId(goal));
    }, [goal]);

    useEffect(() => {
        console.log(`currentEvent: ${JSON.stringify(currentEvent)}`)
        setCurrentTemplate(findTemplate(currentTemplateId));
    }, [currentTemplateId]);

    useEffect(() => {
        setCurrentEvent(getCurrentEvent());
    }, [currentTemplate, event, isNewEvent]);

    useEffect(() => {
        console.log(`currentEvent: ${JSON.stringify(currentEvent)}`)
    }, [currentEvent]);

    const newTemplateSelected = (e) => {
        setCurrentTemplateId(e.target.value);
    }

    const cancelPopup = (e) => {
        setScrollable(true);
        setShowEventPopup(false);
    }

    const stopClickPropagation = (e) => {
        e.stopPropagation();
    }

    return (
        currentEvent != null ?
        (
            <div className="popup-container-background" onClick={cancelPopup}>
                <div className="popup-container" onClick={stopClickPropagation}>
                    <button className="cancel-popup-button grey-white" onClick={cancelPopup}>X</button>
                    <div className="popup-container-inner">
                        {
                            isNewEvent && (currentTemplate == null) ?
                            <>
                                <div className="no-templates-warning">
                                    <img className='kermit-sad' src={KermitSad} alt="Kermit the Frog face palming."/>
                                    <p>No templates exist for this goal! Before you can log completed events, you must use the 'Manage Goals' page to create a template with valid fields for this goal.</p>
                                    <div className="popup-buttons flex-row">
                                        <button className="popup-button red" onClick={cancelPopup}>Cancel</button>
                                        <button className="popup-button grey" onClick={editGoalClicked}>Manage Goal</button>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                {
                                    isNewEvent && currentTemplateId != null ?
                                    <>
                                        <EventTemplateSelect eventTemplates={goal.eventTemplates} currentTemplateId={currentTemplateId} newTemplateSelected={newTemplateSelected}/>
                                    </> :
                                    <label id="template-select-label">{currentEvent.name}</label>
                                }
                                <div className="popup-input">
                                    <EventInput event={currentEvent} edit={currentEvent?.type === LIFT_TYPE ? true : edit} setEdit={setEdit} setShowEventPopup={setShowEventPopup} setInitialLoad={setInitialLoad} isNewEvent={isNewEvent} editGoalTemplateClicked={editGoalTemplateClicked} currentTemplateId={currentTemplateId}/>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        )
        :
            null
    );
}