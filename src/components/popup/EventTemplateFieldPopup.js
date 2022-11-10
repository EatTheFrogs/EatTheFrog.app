import React from 'react';
import { DEFAULT_TYPE } from '../../config/GlobalVars';
import { DefaultEventTemplateFieldPopup } from './DefaultEventTemplateFieldPopup'
import { LiftEventTemplateFieldPopup } from './LiftEventTemplateFieldPopup'
import '../../styles/GoalsCreateModify.css'

export const EventTemplateFieldPopup = ({ eventField, eventTemplate, setShowTemplateFieldPopup }) => {

    return (
        eventTemplate.type === DEFAULT_TYPE ? (
            <DefaultEventTemplateFieldPopup eventField={eventField} templateId={eventTemplate.id} goalId={eventTemplate.goalId} setShowTemplateFieldPopup={setShowTemplateFieldPopup}/>
        )
        : (
            <LiftEventTemplateFieldPopup  eventField={eventField} templateId={eventTemplate.id} goalId={eventTemplate.goalId} setShowTemplateFieldPopup={setShowTemplateFieldPopup}/>
        )
    );
}