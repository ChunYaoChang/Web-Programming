import React, { useState } from "react";
import { Parser as FormulaParser } from 'hot-formula-parser'
import Row from "./Row"


const Table = (props) => {
    // console.log(typeof handleChangeCell)




    const itoalpha = []
    itoalpha.push("");
    for (let i = 0; i < 26; i++)
        itoalpha.push(String.fromCharCode(65 + i));
    for (let i = 0; i < 26; i++)
        for(let j = 0; j < 26; j++)
            itoalpha.push(String.fromCharCode(65 + i) + String.fromCharCode(65 + j));

    const ths = [];
    ths.push(<th className="first-cell first-col"></th>)
    for (let i = 1; i <= props.numCol; i++) {
        ths.push(<th className={(props.selectedC === i) ? "th_is-selected" : "th_not-selected"}>{itoalpha[i]}</th>);
    }

    const makeInput = (i, j, data) => {
        return <input
                    type="text"
                    value={data}
                    autoFocus
                    onKeyUp={(e) => props.handleEnter(e, i, j)}
                    onChange={(e) => props.handleChange(e, i, j)}
                    onBlur={() => props.handleBlur(i, j)}
                />
    }

    const trs = [];
    for (let i = 1; i <= props.numRow; i++) {
        const tds = [];
        tds.push(<th scope="row" className={"first-col" + ((props.selectedR === i) ? " th_is-selected" : " th_not-selected")}>{i}</th>)
        for (let j = 1; j <= props.numCol; j++) {
            const isSelected = props.selectedR === i && props.selectedC === j;
            tds.push(<td 
                id={"" + i + "," + j}
                tabIndex={"" + i + "," + j}
                className={isSelected ? "td_is-selected" : ""}
                onDoubleClick={() => props.handleDoubleClick(i, j)} 
                onClick={() => props.handleClick(i, j)}
                onKeyDown={() => (isSelected && !props.textReady) ? props.handleKeyDown(i, j) : {}}
                onBlur={() => (isSelected && !props.textReady) ? props.handleBlur(i, j) : {}}
            >{(isSelected && props.textReady) ? makeInput(i, j, props.data[i][j].data) : props.data[i][j].data}</td>)
        }
        trs.push(<tr>{tds}</tr>)
    }


    return (
        <table className="table-wrapper">
            <thead>
                {ths}
            </thead>
            <tbody>
                {trs}
            </tbody>
        </table>
    )



    // const rows = []
    // for (let r = 0; r < props.numRow; r++) {
    //     const rowData = props.data[r] || {};
    //     rows.push(
    //         <Row
    //             rowData={rowData}
    //             handleChangeCell={handleChangeCell}
    //             key={r}
    //             r={r}
    //             numCol={props.numCol+1}
    //             executeFormula={executeFormula}
    //         />
    //     )
    // }

    // return (
    //     <table className={className}>
    //         {rows}
    //     </table>
    // )
}

export default Table;