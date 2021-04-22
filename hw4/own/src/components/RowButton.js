import React, { useState } from "react";


const RowButton = (props) => {
    return (
        <div className={props.className}>
            <button style={{marginTop: '60px'}} onMouseDown={props.handleRowAdd}>+</button>
            <br></br>
            <button onMouseDown={props.handleRowDelete}>-</button>
        </div>
    )
}

export default RowButton;