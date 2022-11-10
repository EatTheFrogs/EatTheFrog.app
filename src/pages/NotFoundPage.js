import React from 'react';
import KermitHole from '../images/KermitHole.png';
import '../styles/Global.css';

export const NotFoundPage = () => {

    const pageStyle = {
        paddingTop: `90px`
    }

    const fontStyle = {
        fontSize: `4rem`,
        color: `white`
    }

    const imageStyle = {
        padding: `0 1rem`,
        maxWidth: `90vw`,
        maxHeight: `60vh`
    }

    return (
        <div style={pageStyle} className="page frog-background">
            <h1 style={fontStyle}>404</h1>
            <img style={imageStyle} src={KermitHole} alt="Kermit poking head through hole in wall"/>
            <h1 style={fontStyle}>Page Not Found</h1>
        </div>
    );
}