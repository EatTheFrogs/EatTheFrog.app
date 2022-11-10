import React, { useEffect, useState } from 'react';
import { MAX_EVENT_FIELD_VALUE_LENGTH, EVENT_FIELD_TYPE_NUMBER, EVENT_FIELD_TYPE_DURATION } from '../../config/GlobalVars';
import { DefaultEventInputFieldDuration } from './DefaultEventInputFieldDuration';

export const DefaultEventInputField = ({ index, field, updateValueForIndex, updateDurationForIndex, deleteEventFieldClicked }) => {

    const getValue = () => {
        return field?.value != null ? field.value : "";
    }

    const [value, setValue] = useState(getValue());

    useEffect(() => {
        setValue(getValue());
    }, [field]);

    useEffect(() => {
        if(value != null) {
            console.log(`Updating value: ${value}`);
            updateValueForIndex(index, value);
        }
    }, [value]);

    const onValueChange = (e) => {
        e.preventDefault();
        if(e.target.value.length > MAX_EVENT_FIELD_VALUE_LENGTH) {
            e.target.value = e.target.value.substring(0, MAX_EVENT_FIELD_VALUE_LENGTH);
        } 
        if(field.type === EVENT_FIELD_TYPE_NUMBER && !validateNumberInput(e.target.value)) {
            e.target.value = e.target.value.substring(0, e.target.value.length-1);
        } 
        setValue(e.target.value);
    }

    const validateNumberInput = (input) => {
        return input != null && input.trim().length > 0 && !isNaN(input) && Number.isInteger(Number(input));
    }

    const updateDurationValue = (duration) => {
        setValue(duration);
    }

    const deleteThisField = (e) => {
        deleteEventFieldClicked(field.id);
    }

    return (
        <div className="input-row-container">
            {
                field.type !== EVENT_FIELD_TYPE_DURATION ?
                <>
                    <label className="input-row-label" htmlFor="event-field-name-input">{field.name}:</label>
                    <div className="input-row-wrapper">
                        <div>
                            <input className="input-row wide-input-row" name="event-field-name-input" type={field.type.toLowerCase()} placeholder={field.type} 
                                value={value} onChange={e => onValueChange(e)}/>
                            <p className="input-row-unit">{field.unit}</p> 
                        </div>
                        <button className="event-field-delete-button red" onClick={deleteThisField}>X</button>
                    </div>
                </>
                : <>
                    <DefaultEventInputFieldDuration index={index} field={field} updateDurationForIndex={updateDurationForIndex} deleteThisField={deleteThisField}/>
                </>
            }
        </div>
    )
}