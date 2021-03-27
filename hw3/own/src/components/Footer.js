import React, { useState }from "react";

const Footer = ({ className, count, handleFilter, handleRemoveCompleted, todos }) => {
    return (
        <footer className={className} id="todo-footer">
            <div className="todo-app__total">
                <p>{count} left</p>
            </div>
            <ul className="todo-app__view-buttons">
                <button onClick={() => handleFilter("all")}>All</button>
                <button onClick={() => handleFilter("active")}>Active</button>
                <button onClick={() => handleFilter("completed")}>Completed</button>
            </ul>
            <div className="todo-app__clean">
                {todos.some((todo) => todo.completed) ? (
                    <button onClick={() => handleRemoveCompleted()}>Clear completed</button>
                ) : null}
            </div>
        </footer>
    )
};

export default Footer;
