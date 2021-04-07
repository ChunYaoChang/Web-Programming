import React, {Component} from "react";

import type {TodoItemProps} from "../components/TodoTypeDefinition.js"


const TodoItems = ({ title, style, onItemClick }: TodoItemProps) => (
    <li className="todo-app__item" >
                <div className="todo-app__checkbox">
                    <input id="2" 
                        type="checkbox" 
                        onClick={()=>onItemClick()}
                    ></input>
                    <label htmlFor="2"></label>
                </div>
                <h1 className="todo-app__item-detail"
                    style={style}
                >
                {title}
                </h1>
                <img src="./img/x.png" className="todo-app__item-x" ></img>
            </li>
)

export default TodoItems