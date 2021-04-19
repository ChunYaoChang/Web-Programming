import React, { useState } from "react";


const RowButton = (className) => {
    return (
        <div className={className}>
            <button style={{marginTop: '60px'}}>+</button>
            <br></br>
            <button>-</button>
        </div>
    )
}

export default RowButton;