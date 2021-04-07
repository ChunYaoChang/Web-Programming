import React, {Component} from "react";

import type {TodoItemProps} from "../components/TodoTypeDefinition.js"

const FOOTER = ({totalNumber, onbtnClick, onbtnClickA} : FOOTERProps) => (
    <footer className="todo-app__footer" id="todo-footer">
        <div className="todo-app__total">{totalNumber} left</div>
        <ul className="todo-app__view-buttons">
            <button>All</button>
            <button onClick={()=>onbtnClickA()}>Active</button>
            <button onClick={()=>onbtnClick()} >completed</button>
        </ul>
        <div className="todo-app__clean" >clear completed</div>
    </footer> 
)

export default FOOTER