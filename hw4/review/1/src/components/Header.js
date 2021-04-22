import React from "react";
import "./Table.css"

export default function Header(props) {
    const start = 'A';
    const headerCharacter = (index) => {
        let string = "";
        let a = index;
        if (a == 0) {
            return String.fromCharCode(start.charCodeAt(0));
        }
        while (a != 0) {
            string = string.concat(String.fromCharCode(start.charCodeAt(0) + a % 26));
            a = parseInt(a / 26);
        }
        return string;
    }
    const header = [<td id={`header-0`} className="index"></td>, (Array(props.col).fill(0)).map((item, index) =>
        <td className="header" id={`header-${index}`}>
            {headerCharacter(index)}
        </td>)];



    return (
        <>
            <tr>
                {header}
            </tr>
        </>
    )
}