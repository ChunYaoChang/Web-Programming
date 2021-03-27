import React, { useState } from "react";

const Input = ({ handleChange, handleSubmit, nowTodos}) => {
    
    return (
        <form onSubmit={handleSubmit}>
            <input className="todo-app__input" placeholder="What needs to be done?" value={nowTodos} onChange={handleChange}/>
        </form>
    )
}

export default Input;