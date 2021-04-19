import React, { useState } from "react";


const ColumnButton = (className) => {
    return (
        <div className={className}>
            <button style={{marginLeft: '100px'}}>+</button>
            <button>-</button>
        </div>
    )
}

export default ColumnButton;
