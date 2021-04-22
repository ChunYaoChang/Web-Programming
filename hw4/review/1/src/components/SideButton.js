import React from 'react';

const SideButton = (props) => {
    return (
        <div className="left-button">
            <button onClick={props.addRow}>+</button>
            <button onClick={props.removeRow}>-</button>
        </div>
    )
}

export default SideButton;