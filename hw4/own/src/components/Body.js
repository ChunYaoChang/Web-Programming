import React, { useState } from "react";
import ColumnButton from "./ColumnButton"
import Table from "./Table"

const Body = (props) => {

    // console.log(typeof handleChangeCell)
    return (
        <div>
            <ColumnButton 
                className="r0" 
                handleColAdd={props.handleColAdd}
                handleColDelete={props.handleColDelete}
            />
            <Table 
                className="table-wrapper"
                data={props.data}
                data={props.data}
                numRow={props.numRow}
                numCol={props.numCol}
                selectedR={props.selectedR}
                selectedC={props.selectedC}
                textReady={props.textReady}
                handleKeyDown={props.handleKeyDown}
                handleEnter={props.handleEnter}
                handleChange={props.handleChange}
                handleDoubleClick={props.handleDoubleClick}
                handleClick={props.handleClick}
                handleBlur={props.handleBlur}

            />
        </div>
    )
}

export default Body;