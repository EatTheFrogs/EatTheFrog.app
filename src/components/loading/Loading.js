import React from 'react';
import { FrogJumpSequence } from './FrogJumpSequence';
import '../../styles/Loading.css';

export const Loading = () => {
    return (
        <div id="loading-container" className="frog-background">
            <FrogJumpSequence intervalTime={300}/>
            <p id="loading-text">Loading...</p>
        </div>
    );
}