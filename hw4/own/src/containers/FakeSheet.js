import React, { useState, useEffect, useCallback } from "react";
import RowButton from "../components/RowButton";
import { Parser as FormulaParser } from 'hot-formula-parser'
import Body from "../components/Body";

const FakeSheet = () => {

    const [numRow, setNumRow] = useState(100)
    const [numCol, setNumCol] = useState(26)
    const [selectedR, setSelectedR] = useState(-1);
    const [selectedC, setSelectedC] = useState(-1);
    const [textReady, setTextReady] = useState(false);

    let initInfo = (r, c) => {
        return {
            "r" : r,
            "c" : c,
            "data": ""
        };
    };
    
    const initialInfo = [];
    const initialDisplayInfo = [];
    for (let i = 0; i < numRow + 1; i++) {
        initialInfo[i] = [];
        // initialDisplayInfo[i] = [];
        for (let j = 0; j < numCol + 1; j++) {
            initialInfo[i][j] = initInfo(i, j);
            // initialDisplayInfo[i][j] = initInfo(i, j);
        }
    }
    const [data, setData] = useState(initialInfo);
    // const [displayData, setDisplayData] = useState(initialDisplayInfo);

    // var parser = new FormulaParser()
    // parser.on('callCellValue', (cellCoord, done) => {
    //     const c = cellCoord.column.index + 1
    //     const r = cellCoord.row.index + 1

    //     // Check if I have that coordinates tuple in the table range
    //     if (c > numCol || r > numRow) {
    //         throw parser.Error(parser.ERROR_NOT_AVAILABLE)
    //     }

    //     // Check that the cell is not self referencing
    //     if (parser.cell.c === c && parser.cell.r === r) {
    //         throw parser.Error(parser.ERROR_REF)
    //     }

    //     if (!displayData[r] || !displayData[r][c]) {
    //         return done('')
    //     }

    //     // All fine
    //     return done(displayData[r][c])
    // })
    //   // When a formula contains a range value, this event lets us
    //   // hook and return an error value if necessary
    // parser.on('callRangeValue', (startCellCoord, endCellCoord, done) => {
    //     const sc = startCellCoord.column.index + 1
    //     const sr = startCellCoord.row.index + 1
    //     const ec = endCellCoord.column.index + 1
    //     const er = endCellCoord.row.index + 1
    //     const fragment = []

    //     for (let r = sr; r <= er; r += 1) {
    //         const row = displayData[r]
    //         if (!row) {
    //             continue
    //         }

    //         const colFragment = []

    //         for (let c = sc; c <= ec; c += 1) {
    //             let value = row[c].data
    //             if (!value) {
    //                 value = ''
    //             }

    //             if (value.slice(0, 1) === '=') {
    //                 const res = executeFormula({r, c}, value.slice(1))
    //                 if (res.error) {
    //                     throw parser.Error(res.error)
    //                 }
    //                 value = res.result
    //             }

    //             colFragment.push(value)
    //         }
    //         fragment.push(colFragment)
    //     }

    //     if (fragment) {
    //         done(fragment)
    //     }
    // })
    // //...
    // /**
    //  * Executes the formula on the `value` usign the
    //  * FormulaParser object
    //  */
    // const executeFormula = (cell, value) => {
    //     parser.cell = cell
    //     // console.log(cell)
    //     let res = parser.parse(value)
    //     if (res.error != null) {
    //         return res.error // tip: returning `res.error` shows more details
    //     }
    //     if (res.result.toString() === '') {
    //         return res
    //     }
    //     if (res.result.toString().slice(0, 1) === '=') {
    //         // formula points to formula
    //         res = executeFormula(cell, res.result.slice(1))
    //     }
    
    //     return res
    // }






    const handleDoubleClick = (r, c) => {
        setSelectedR(r);
        setSelectedC(c);
        setTextReady(true);
    }

    const handleClick = (r, c) => {
        document.getElementById("" + r + "," + c).focus();
        setSelectedR(r);
        setSelectedC(c);
        setTextReady(false);
    }

    const handleKeyDown = (r, c) => {
        const newInfoArr = [...data];
        newInfoArr[r][c].data = "";
        setData(newInfoArr);
        setTextReady(true);
    }

    const handleEnter = ({ key }, r, c) => {
        if ((key === 'Enter') && (r !== numRow))
            setSelectedR(r + 1);
    }
    
    // const [, updateState] = useState();
    // const forceUpdate = useCallback(() => updateState(), [])

    // const determineDisplay = (r, c, value) => {
    //     // console.log(typeof value)
    //     if (value.slice(0, 1) === '=') {
    //         const res = executeFormula({r, c}, value.slice(1))
    //         console.log(res)
    //         if (res.error !== null) {
    //             return {r: r, c: c, data: "ERROR!"}
    //         } else {
    //             if (typeof res.result === "number") {
    //                 return {r: r, c: c, data: res.result}
    //             }
    //             return res.result
    //         }
    //     } else {
    //         return {r: r, c: c, data: value}
    //     }
    // }

    const handleChange = ({ target }, r, c) => {
        const { value } = target;
        // const displayValue = determineDisplay(r, c, value);
        
        const newInfoArr = [...data];
        // const newDisplayArr = [...displayData];
        newInfoArr[r][c].data = value;
        setData(newInfoArr);
        // newDisplayArr[r][c] = displayValue;
        // console.log(displayValue)
        // setDisplayData(newDisplayArr);
        // console.log("fuck")
        // forceUpdate()
    };

    const [prevR, setPrevR] = useState(-1);
    const [prevC, setPrevC] = useState(-1);

    const handleBlur = () => {
        setSelectedR(-1);
        setSelectedC(-1);
    }


    const handleRowAdd = () => {
        const newRow = [];
        const rowIndex = (selectedR !== -1) ? selectedR : numRow + 1;
        for (let j = 0; j < numCol + 1; j++)
            newRow.push(initInfo(rowIndex, j));
        const newInfoArr = [...data];
        newInfoArr.splice(rowIndex, 0, newRow);
        // const newDisplayArr = [...displayData];
        // newDisplayArr.splice(rowIndex, 0, newRow);
        setPrevR(selectedR);
        setPrevC(selectedC);
        setNumRow(numRow + 1);
        setData(newInfoArr);
        // setDisplayData(newDisplayArr);
    }

    useEffect(() => {
        if (prevR !== -1) {
            const newR = prevR + 1
            document.getElementById("" + newR + "," + prevC).focus();
            setSelectedR(newR);
            setSelectedC(prevC);
        }
    }, [numRow]);

    const handleRowDelete = () => {
        if (numRow <= 2) {
            alert("The minimum number of rows is 2.")
        } else if (selectedR !== -1) {
            const newInfoArr = [...data];
            newInfoArr.splice(selectedR, 1);
            // const newDisplayArr = [...displayData];
            // newDisplayArr.splice(selectedR, 1);
            setPrevR(-1);
            setPrevC(-1);
            setNumRow(numRow - 1);
            setData(newInfoArr);
            // setDisplayData(newDisplayArr);
        }
    }

    const handleColAdd = () => {
        const colIndex = (selectedC !== -1) ? selectedC : numCol + 1;
        const newInfoArr = [...data];
        newInfoArr.map((row, index) => {
            row.splice(colIndex, 0, initInfo(index, colIndex));
            return row;
        })
        // const newDisplayArr = [...displayData];
        // newDisplayArr.map((row, index) => {
        //     row.splice(colIndex, 0, initInfo(index, colIndex));
        //     return row;
        // })
        setPrevR(selectedR);
        setPrevC(selectedC);
        setNumCol(numCol + 1);
        setData(newInfoArr);
        // setDisplayData(newDisplayArr);
    }

    useEffect(() => {
        if (prevC !== -1) {
            const newC = prevC + 1
            document.getElementById("" + prevR + "," + newC).focus();
            setSelectedR(prevR);
            setSelectedC(newC);
        }
    }, [numCol]);

    const handleColDelete = () => {
        if (numCol <= 2) {
            alert("The minimum number of columns is 2.")
        } else if (selectedC !== -1) {
            const newInfoArr = [...data];
            newInfoArr.map((row, index) => {
                row.splice(selectedC, 1);
                return row;
            })
            // const newDisplayArr = [...displayData];
            // newDisplayArr.map((row, index) => {
            //     row.splice(selectedC, 1);
            //     return row;
            // })
            setPrevR(-1);
            setPrevC(-1);
            setNumCol(numCol - 1);
            setData(newInfoArr);
            // setDisplayData(newDisplayArr);
        }
    }

    // console.log(typeof handleChangeCell)

    return (
        <div className="wrapper">
            <RowButton className="c0" handleRowAdd={handleRowAdd} handleRowDelete={handleRowDelete}/>
            <Body 
                handleColAdd={handleColAdd}
                handleColDelete={handleColDelete}
                data={data}
                numRow={numRow}
                numCol={numCol}
                selectedR={selectedR}
                selectedC={selectedC}
                textReady={textReady}
                handleKeyDown={handleKeyDown}
                handleEnter={handleEnter}
                handleChange={handleChange}
                handleDoubleClick={handleDoubleClick}
                handleClick={handleClick}
                handleBlur={handleBlur}
            />

        </div>
    )
}

export default FakeSheet;

