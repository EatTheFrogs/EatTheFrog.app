import React from "react";

export const DeletePopup = ({ deleteMessage, cancelCallback, deleteCallback }) => {

    return (
        <div className="delete-popup-container-background">
            <div className="delete-popup-container">
                <p>{deleteMessage}</p>
                <p className="delete-popup-message">This cannot be undone.</p>
                <div className="popup-buttons flex-row">
                    <button className="popup-button light-grey" onClick={cancelCallback}>Cancel</button>
                    <button className="popup-button red" onClick={deleteCallback}>Delete</button>
                </div>
            </div>
        </div>
    )
}