import React, { useState, useEffect } from "react";
import './Table.css';

const Table = (props) => {
    const [highlight, setHighlight] = useState({ r: -1, c: -1 });
    const [editing, setEditing] = useState(false);
    const [formula, setFormula] = useState(false);
    const [paste, setPaste] = useState({ copy: false, value: "" });
    const table = document.getElementById("table");

    const cell = (data, row, col) => {
        return (
            <td
                className="form"
                id={`cell-${row}-${col}`}
                contenteditable='false'
                tabIndex="0"
                onClick={(e) => {
                    let r = e.target.parentElement.rowIndex;
                    let c = e.target.cellIndex;
                    document.getElementById("table").childNodes[1].childNodes[r - 1].childNodes[0].style['background-color'] = "lightgrey";
                    document.getElementById("table").childNodes[0].childNodes[0].childNodes[c].style['background-color'] = "lightgrey";
                    setHighlight({ r: r - 1, c: c });
                }}
                onDoubleClick={doubleclick}
                onBlur={blur}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        if (editing) {
                            blur(e);
                            table.childNodes[1].childNodes[highlight.r + 1].childNodes[highlight.c].focus()
                            table.childNodes[1].childNodes[highlight.r + 1].childNodes[highlight.c].click()
                        }
                        else {
                            e.target.setAttribute("contenteditable", "true");
                            e.target.style.textAlign = "left";
                            setEditing(true);
                        }
                    }
                    if (e.key === '=' && editing && e.target.innerText[0] == '=') {
                        setFormula(true);
                        e.target.style.color = "blue";
                    }
                    if (editing === false && (e.key !== 'Enter' || e.key !== 'Tab')) {
                        doubleclick(e);
                        e.target.innerText = e.key;
                        selectText(`cell-${e.target.parentElement.rowIndex - 1}-${e.target.cellIndex - 1}`);
                    }
                }}
                onKeyDown={(e) => {
                    if (e.ctrlKey && e.key == 'c') {
                        setPaste({ copy: true, value: e.target.innerHTML });
                    }
                    else if (e.ctrlKey && e.key == 'v') {
                        e.target.innerText = paste.value;
                    }
                }}
            >{data}</td>)
    }

    const selectText = (element) => {
        var doc = document
            , text = doc.getElementById(element)
            , range, selection;
        if (window.getSelection) {
            selection = window.getSelection();
            range = doc.createRange();
            range.selectNodeContents(text);

            range.setStart(text.firstChild, 1);
            range.setEnd(text.firstChild, 1);

            selection.removeAllRanges();
            selection.addRange(range);

        }
    }

    const doubleclick = (e) => {
        e.target.setAttribute("tabIndex", "");
        e.target.setAttribute("contenteditable", true);
        e.target.focus();

        e.target.style.textAlign = "left";
        setEditing(true);
    }

    const blur = (e) => {
        setEditing(false);
        let value = e.target.innerText;

        let form = "";
        if (formula) {
            value = props.formula(value);
            form = e.target.innerText
        }


        setFormula(false);

        e.target.setAttribute("tabIndex", "0");
        e.target.setAttribute("contenteditable", "false");
        e.target.style.textAlign = "center";
        e.target.style.color = "black";

        if (highlight.r != -1 && table) {
            table.childNodes[1].childNodes[highlight.r].childNodes[0].style['background-color'] = "#f6f5f5";
            table.childNodes[0].childNodes[0].childNodes[highlight.c].style['background-color'] = "#f6f5f5";
        }

        props.add({
            r: e.target.parentElement.rowIndex,
            c: e.target.cellIndex,
            formula: form,
            value: value,
        })
        makeTable()
    }


    const makeRow = (index) => {
        var row = [<td id={`index-${index}`} className="index">{index}</td>];
        for (let i = 0; i < props.col; i++) {
            row.push(cell("", index, i));
        }
        return row;
    }

    const makeTable = () => {
        var table = [[]];
        for (let i = 0; i < props.row; i++) {
            table.push(
                <tr>{makeRow(i)}</tr>);
        }
        for (let i = 0; i < props.data.length; i++) {
            let d = props.data[i];
            if (d.formula == "")
                table[d.r].props.children[d.c] = cell(d.value, d.row, d.col);
            else
                table[d.r].props.children[d.c] = cell(props.formula(d.formula), d.row, d.col);
        }
        return table;
    }


    return (
        <>
            {makeTable()}
        </>
    )
}

export default Table;