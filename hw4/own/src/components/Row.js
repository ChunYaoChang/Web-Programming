import React, { useState } from "react";
import Cell from "./Cell"
import PropTypes from 'prop-types'

const Row = ({rowData, handleChangeCell, key, r, numCol, executeFormula}) => {
    const cells = []

    for (let c = 0; c < numCol; c++) {
        cells.push(
            <Cell 
                handleChangeCell={handleChangeCell}
                key={`${r}-${c}`}
                r={r}
                c={c}
                value={rowData[c] || ''}
                executeFormula={executeFormula}
            />
        )
    }
    return (
        <tr>
            {cells}
        </tr>
    )
}

Row.propTypes = {
    handleChangeCell: PropTypes.func.isRequired
}

export default Row;