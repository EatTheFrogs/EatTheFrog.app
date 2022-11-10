import React, { useState } from 'react';
import '../../styles/Global.css';
import '../../styles/EventsPage.css';
import '../../styles/GoalsCreateModify.css'
import { LiftSelectRow } from './LiftSelectRow';

export const LiftSelect = ({ liftEventFields, currentLiftId, edit, event, setInitialLoad, setShowEventPopup }) => {

    const [selectedId, setSelecetedId] = useState(null);

    const newLiftSelected = (liftId) => {
        setSelecetedId(liftId);
    }

    return (
        <div id="lift-select-container">
            {
                liftEventFields?.map( (lift, index) => (
                    <LiftSelectRow key={lift.id} index={index} lift={lift} selectedId={selectedId} newLiftSelected={newLiftSelected} 
                        event={event} setInitialLoad={setInitialLoad} setShowEventPopup={setShowEventPopup}/>
                ))
            }
        </div>
    );
}