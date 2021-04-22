import React, { Component ,useState} from "react";

function inputbox(props){
    
    return(
        <input type="text" value={props.text}/>
    );
}

export default inputbox;

