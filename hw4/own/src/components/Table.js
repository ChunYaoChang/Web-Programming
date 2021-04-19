import React, { useState } from "react";
import { Parser as FormulaParser } from 'hot-formula-parser'
import Row from "./Row"


const Table = ({className, data, handleChangeCell, numRow, numCol}) => {
    // console.log(typeof handleChangeCell)

    var parser = new FormulaParser()
    parser.on('callCellValue', (cellCoord, done) => {
        const c = cellCoord.column.index + 1
        const r = cellCoord.row.index + 1

        // Check if I have that coordinates tuple in the table range
        if (c > numCol || r > numRow) {
            throw parser.Error(parser.ERROR_NOT_AVAILABLE)
        }

        // Check that the cell is not self referencing
        if (parser.cell.c === c && parser.cell.r === r) {
            throw parser.Error(parser.ERROR_REF)
        }

        if (!data[r] || !data[r][c]) {
            return done('')
        }

        // All fine
        return done(data[r][c])
    })
      // When a formula contains a range value, this event lets us
      // hook and return an error value if necessary
    parser.on('callRangeValue', (startCellCoord, endCellCoord, done) => {
        const sc = startCellCoord.column.index + 1
        const sr = startCellCoord.row.index + 1
        const ec = endCellCoord.column.index + 1
        const er = endCellCoord.row.index + 1
        const fragment = []

        for (let r = sr; r <= er; r += 1) {
            const row = data[r]
            if (!row) {
                continue
            }

            const colFragment = []

            for (let c = sc; c <= ec; c += 1) {
                let value = row[c]
                if (!value) {
                    value = ''
                }

                if (value.slice(0, 1) === '=') {
                    const res = executeFormula({r, c}, value.slice(1))
                    if (res.error) {
                        throw parser.Error(res.error)
                    }
                    value = res.result
                }

                colFragment.push(value)
            }
            fragment.push(colFragment)
        }

        if (fragment) {
            done(fragment)
        }
    })
    //...
    /**
     * Executes the formula on the `value` usign the
     * FormulaParser object
     */
    const executeFormula = (cell, value) => {
        parser.cell = cell
        console.log(cell)
        let res = parser.parse(value)
        if (res.error != null) {
            return res // tip: returning `res.error` shows more details
        }
        if (res.result.toString() === '') {
            return res
        }
        if (res.result.toString().slice(0, 1) === '=') {
            // formula points to formula
            res = executeFormula(cell, res.result.slice(1))
        }
    
        return res
    }


    const rows = []
    for (let r = 0; r < numRow; r++) {
        const rowData = data[r] || {};
        rows.push(
            <Row
                rowData={rowData}
                handleChangeCell={handleChangeCell}
                key={r}
                r={r}
                numCol={numCol+1}
                executeFormula={executeFormula}
            />
        )
    }

    return (
        <table className={className}>
            {rows}
        </table>
    )
}

export default Table;