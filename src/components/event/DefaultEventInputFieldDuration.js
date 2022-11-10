import React, { useEffect, useState } from 'react';
import { MAX_EVENT_DURATION_FIELD_VALUE_LENGTH} from '../../config/GlobalVars';

export const DefaultEventInputFieldDuration = ({ index, field, updateDurationForIndex, deleteThisField }) => {

    const getDefault = (nullableValue) => {
        return  nullableValue != null ? nullableValue : "";
    }

    const [hours, setHours] = useState(getDefault(field?.duration?.hours));
    const [minutes, setMinutes] = useState(getDefault(field?.duration?.minutes));
    const [seconds, setSeconds] = useState(getDefault(field?.duration?.seconds));

    useEffect(() => {
        setHours(getDefault(field?.duration?.hours));
        setMinutes(getDefault(field?.duration?.minutes));
        setSeconds(getDefault(field?.duration?.seconds));
    }, [field]);

    useEffect(() => {
        updateDurationForIndex(index, {
            ...field.duration,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        });
    }, [hours, minutes, seconds]);

    const onValueChange = (e, setState) => {
        e.preventDefault();
        if(!validateInput(e.target.value.trim())) {
            e.target.value = e.target.value.substring(0, e.target.value.length-1);
        } 
        setState(e.target.value.trim());
    }

    const validateInput = (input) => {
        let isNumber = input != null && input.trim().length > 0 && !isNaN(input) && Number.isInteger(Number(input));
        let validLength = input.length <= MAX_EVENT_DURATION_FIELD_VALUE_LENGTH;
        return isNumber && validLength;
    }

    return (
        <>
            <label className="input-row-label input-row-duration-label">{field.name}:</label>
            <div className="input-row-wrapper">
                <div className="input-row-duration-container">
                    <div className="input-row-duration-group">
                        <input className="input-row" type="number" placeholder="hh" value={hours} onChange={e => onValueChange(e, setHours)}/>
                        <p className="input-row-unit">hr</p>
                    </div>
                    <div className="input-row-duration-group">
                        <input className="input-row" type="number" placeholder="MM" value={minutes} onChange={e => onValueChange(e, setMinutes)}/>
                        <p className="input-row-unit">min</p>
                    </div>
                    <div className="input-row-duration-group">
                        <input className="input-row" type="number" placeholder="ss" value={seconds} onChange={e => onValueChange(e, setSeconds)}/>
                        <p className="input-row-unit">sec</p>
                    </div>
                </div>
                <button className="event-field-delete-button red" onClick={deleteThisField}>X</button>
            </div>
        </>
    )
}