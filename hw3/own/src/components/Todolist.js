import React, { useState } from "react";
import xpic from "../img/x.png"

const Todolist = ({ handleComplete, handleRemove, filterTodos }) => {
    // console.log(filterTodos);
    return (
        <ul className="todo-app__list" id="todo-list">
            {filterTodos.map(({text, id, completed}) => (
                <li className="todo-app__item">
                    <div className="todo-app__checkbox">
                        <input id={id} type="checkbox" checked={completed} onClick={() => handleComplete(id)}/>
                        <label for={id} />
                    </div>
                    <h1 className="todo-app__item-detail" style={completed === true ? {textDecoration: "line-through", opacity: 0.5} : {textDecoration: "none", opacity: 1}}>{text}</h1>
                    <img src={xpic} className="todo-app__item-x" onClick={() => handleRemove(id)} />
                </li>
            ))}
        </ul>
    )
};

export default Todolist;