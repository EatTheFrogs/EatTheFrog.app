import React from 'react';
import { DEFAULT_TYPE } from '../../../config/GlobalVars';
import { DefaultEventTemplateField } from './DefaultEventTemplateField'
import { LiftEventTemplateField } from './LiftEventTemplateField'
import '../../../styles/GoalsCreateModify.css'

export const EventTemplateField = ({ eventField, eventTemplate }) => {

    return (
        eventTemplate.type === DEFAULT_TYPE ? (
            <DefaultEventTemplateField eventField={eventField} templateId={eventTemplate.id} goalId={eventTemplate.goalId}/>
        )
        : (
            <LiftEventTemplateField  eventField={eventField} templateId={eventTemplate.id} goalId={eventTemplate.goalId}/>
        )
    );
}