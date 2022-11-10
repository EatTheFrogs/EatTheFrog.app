import React, { useState } from 'react';
import { LiftEventInputField } from './LiftEventInputField'
import '../../styles/Global.css';
import '../../styles/EventsPage.css';
import '../../styles/GoalsCreateModify.css'

export const LiftSelectRow = ({ index, lift, selectedId, newLiftSelected, event, setInitialLoad, setShowEventPopup }) => {

    const caretClicked = (e) => {
        lift?.id !== selectedId ? newLiftSelected(lift.id) : newLiftSelected(null);
    }

    return (
        <div className="lift-select-row-container">
            <div className="lift-select-row flex-row grey" onClick={caretClicked}>
                <p className="lift-select-row-name"><b>{lift.name}</b></p>
                {
                    selectedId === lift?.id ?
                        <p className="lift-select-caret">&#9660;</p>
                    :
                        <p className="lift-select-caret">&#9650;</p>
                }
            </div>
            {
                selectedId === lift?.id ?
                    <LiftEventInputField index={index} field={lift} edit={true} event={event} setInitialLoad={setInitialLoad} setShowEventPopup={setShowEventPopup}/>
                : 
                    null
            }
        </div>
    );
}