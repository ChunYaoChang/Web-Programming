import React, { useState, useEffect } from "react";
import HeaderButton from "../components/HeaderButton.js"
import SideButton from "../components/SideButton.js"
import SpreadSheet from "./SpreadSheet.js"
import "../components/Table.css"
export default function FakeSheet() {
    const [row, setRow] = useState(100);
    const [col, setCol] = useState(26);
    const [focus, setFocus] = useState({ r: -1, y: -1 });
    const [data, setData] = useState([
        {
            id: 0,
            key: 0,
            r: 6,
            c: 5,
            formula: "",
            value: "test1",
        },
        {
            id: 1,
            key: 1,
            r: 8,
            c: 3,
            formula: "",
            value: "test2",
        }
    ])

    const formulaResult = (text) => {
        let table = document.getElementById("table");
        let formula = text.match(/([A-Za-z]+)([0-9]+)/);
        if (!formula)
            return "Err formula!!";
        let colIndex = -1;
        formula[1].split("").forEach((item, index) => {
            colIndex = colIndex + (item.charCodeAt(0) - "A".charCodeAt(0) + 1) * Math.pow(26, index);
        })
        let rowIndex = parseInt(formula[2]);
        // console.log("row " + rowIndex + " col" + colIndex + " innerHTML: " + table.childNodes[1].childNodes[rowIndex].childNodes[colIndex + 1].innerHTML)
        if (table.childNodes[1].childNodes[rowIndex].childNodes[colIndex + 1].innerHTML == "")
            return "f";
        return table.childNodes[1].childNodes[rowIndex].childNodes[colIndex + 1].innerHTML;
    }
    const checkFormula = (tmp) => {
        if (tmp == null)
            return;
        tmp.map((item) => {
            if (item.formula == "")
                return item;
            else {
                item.value = formulaResult(item.formula);
                return item;
            }
        })
        setData(tmp);
        setTimeout(() => {
            console.log(data);
        }, 2)
    }

    const removeRow = () => {
        if (focus.r == -1)
            return;
        let i = focus.r;
        let tmp = data;
        tmp = tmp.filter(x => x.r != i);
        tmp.forEach(x => {
            if (x.r > i)
                x.r = x.r - 1;
        })
        setRow(row - 1);
        setFocus({ r: -1, c: -1 })
        checkFormula(tmp);
    }

    const addRow = () => {
        if (focus.r == -1)
            return;
        let i = focus.r;
        let tmp = data;
        tmp.forEach(x => {
            if (x.r >= i)
                x.r = x.r + 1;
        })
        setRow(row + 1);
        setFocus({ r: -1, c: -1 })
        checkFormula(tmp);
    }

    const removeCol = () => {
        setTimeout(() => {
            if (focus.c == -1)
                return;
            let i = focus.c;
            console.log(i)
            let tmp = data;
            tmp = tmp.filter(x => x.c != i);
            tmp.forEach(x => {
                if (x.c > i)
                    x.c = x.c - 1;
            })
            console.log("tmp" + tmp[0] + tmp[1])

            setCol(col - 1);
            setFocus({ r: -1, c: -1 })
            checkFormula(tmp);
        }, 1)

    }

    const addCol = () => {
        if (focus.c == -1)
            return;
        let i = focus.c;
        let tmp = data;
        tmp.forEach(x => {
            if (x.c >= i)
                x.c = x.c + 1;
        })
        setCol(col + 1);
        setFocus({ r: -1, c: -1 })
        checkFormula(tmp);
    }

    const addData = (props) => {
        console.log("add")
        setFocus({ r: props.r, c: props.c });

        let d = {
            id: data.length,
            key: data.length,
            r: props.r,
            c: props.c,
            formula: props.formula,
            value: props.value,
        }
        if (props.value != "") {
            let tmp = data;
            let replace = false;
            tmp.map((item) => {
                if (item.r == d.r && item.c == d.c) {
                    replace = true;
                    return d;
                }
                return item;
            })
            if (replace == true)
                setData(tmp);
            else
                setData([...data, d]);
        }
    }

    // const hi = () => {
    //     document.getElementById('click').setAttribute('contenteditable', true);
    //     document.getElementById('click').focus();
    // }
    // const selectText = () => {
    //     const input = document.getElementById('text-box');
    //     input.focus();
    //     input.setSelectionRange(2, 2);
    // }
    // const selectText = (element) => {
    //     var doc = document
    //         , text = doc.getElementById(element)
    //         , range, selection;
    //     if (window.getSelection) {
    //         selection = window.getSelection();
    //         range = doc.createRange();
    //         range.selectNodeContents(text);

    //         range.setStart(text.firstChild, 1);
    //         range.setEnd(text.firstChild, 1);

    //         selection.removeAllRanges();
    //         selection.addRange(range);
    //         console.log(range)
    //     }
    // }
    return (
        <>
            <div>
                <HeaderButton removeCol={removeCol} addCol={addCol} />
                <div className="outsideTable">
                    <SideButton removeRow={removeRow} addRow={addRow} />
                    <SpreadSheet row={row} col={col} data={data} add={addData} formula={formulaResult} />
                </div>
                {/* <table>
                    <td
                        id="click"
                        contentEditable='false'
                        onDoubleClick={hi}
                        onBlur={(e) => {
                            e.target.setAttribute('contenteditable', false);
                        }}
                    >
                        hi
                    </td>
                </table>
                <button onClick={hi} /> */}

                {/* <table><td type="text" id="text-box" size="20" value="Mozilla" contentEditable="true"></td></table>
                <input type="text" id="text-box" size="20" value="Mozilla" />
                <button onClick={selectText}>Select text</button> */}
            </div>
        </>
    );
}

