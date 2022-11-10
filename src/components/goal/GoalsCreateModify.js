import React, { useState, useEffect, useContext } from 'react';
import { GoalsCreate } from './GoalsCreate';
import { GoalsModify } from './GoalsModify';
import { AppContext } from '../routing/SecureRoutes';

export const GoalsCreateModify = () => {

    const { goals } = useContext(AppContext);

    const [modifyTabSelected, setModifyTabSelected] = useState(goals?.length > 0);

    useEffect(() => {
        setModifyTabSelected(goals?.length > 0);
    }, [goals]);

    const modifyTabClick = () => {
        return setModifyTabSelected(true);
    }

    const createTabClick = () => {
        return setModifyTabSelected(false);
    }

    const [modifyTabColor, setModifyTabColor] = useState(``);
    const [createTabColor, setCreateTabColor] = useState(``);

    const modifyTabStyle = {
        color: modifyTabColor,
        borderBottom: `2px solid ${modifyTabColor}`
    }

    const createTabStyle = {
        color: createTabColor,
        borderBottom: `2px solid ${createTabColor}`
    }

    // Change tab color when switching tabs
    useEffect(() => {
        if(modifyTabSelected) {
            setModifyTabColor(`black`);
            setCreateTabColor(`rgb(170, 170, 170)`);
        }
        else {
            setModifyTabColor(`rgb(170, 170, 170)`);
            setCreateTabColor(`black`);
        }
    }, [modifyTabSelected]);

    return (
        
        <div id="create-modify-container">
            <div className="create-modify-section" id="create-modify-tab-container"> 
                <button className="tab" style={createTabStyle} onClick={createTabClick}>Create New Goal</button>
                <button className="tab" style={modifyTabStyle} onClick={modifyTabClick}>Modify Goals</button>
            </div>
            <div id="create-modify-input-container">
                {modifyTabSelected ?
                    <GoalsModify/>
                :
                    <GoalsCreate/>
                }
            </div>
        </div>
    );
}