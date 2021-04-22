import React, { Component ,useState} from "react";
import Inputbox from "../components/Inputbox";


function Sheet(){
    const [mytable,setmytable]=useState([[0,1],[2,3]]);
    console.log(mytable)
    return(
        <table>
            <tbody>
            {mytable.map(e=>(
                <tr>{
                    e.map(ee=>(
                        <td><Inputbox text={ee} /></td>
                    ))
                }</tr>
            ))
            }
            </tbody>
        </table>
    );
}

export default Sheet;

