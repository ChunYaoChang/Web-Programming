import React, { useState } from "react";


const ColumnButton = (props) => {
    return (
        <div className={props.className}>
            <button style={{marginLeft: '100px'}} onMouseDown={props.handleColAdd}>+</button>
            <button onMouseDown={props.handleColDelete}>-</button>
        </div>
    )
}

export default ColumnButton;
