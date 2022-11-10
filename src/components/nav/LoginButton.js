import React from 'react';

export const LoginButton = ({ clicked, styled }) => {
    return (
        <button onClick={clicked} style={styled}>Login</button>
    );
}