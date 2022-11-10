import React from 'react';
import '../../styles/Global.css';
import '../../styles/EventsPage.css';
import '../../styles/GoalsCreateModify.css'

export const EventTemplateSelect = ({ eventTemplates, currentTemplateId,  newTemplateSelected }) => {

    return (
        <div id="template-select-container">
            <label id="template-select-label" htmlFor="template-select">Event Template: </label>
            <select name="template-select" id="template-select" value={currentTemplateId} onChange={newTemplateSelected}>
                {
                    eventTemplates.map( template => (
                        <option key={template.id} value={template.id}>{template.name}</option>
                    ))
                }
            </select>
        </div>
    );
}