import React from 'react';

const HeaderButton = (props) => {
    return (
        <div>
            <button onClick={props.addCol} id="add-col">+</button>
            <button onClick={props.removeCol}>-</button>
        </div>
    )
}

export default HeaderButton;