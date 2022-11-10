import React, { useEffect, useState } from 'react';
import '../../styles/GoalsPage.css'

export const EventLogCard = ( { event, viewExistingEvent } ) => {

    const [name, setName] = useState(event.name);
    const [date, setDate] = useState((new Date(event.completedDate)).toLocaleDateString());

    useEffect(() => {
        console.log('Event update in log card!');
        setName(event.name);
        setDate((new Date(event.completedDate)).toLocaleDateString());
    }, [event]);

    const viewEvent = (e) => {
        viewExistingEvent(event);
    }

    return (
        <div className="event-log-card flex-column" onClick={viewEvent}>
            <p className="event-log-card-title">{name}</p>
            <p className="event-log-card-date">{date}</p>
        </div>
    );
}