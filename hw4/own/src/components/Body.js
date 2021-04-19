import React, { useState } from "react";
import ColumnButton from "./ColumnButton"
import Table from "./Table"

const Body = ({data, handleChangeCell, numRow, numCol}) => {

    // console.log(typeof handleChangeCell)
    return (
        <div>
            <ColumnButton className="r0"/>
            <Table 
                className="table-wrapper"
                data={data}
                handleChangeCell={handleChangeCell}
                numRow={numRow}
                numCol={numCol}
            />
        </div>
    )
}

export default Body;