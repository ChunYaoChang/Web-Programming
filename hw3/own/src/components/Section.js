import React, { useState } from "react";
import Input from "./Input";
import Todolist from "./Todolist";

const Section = ({ className, nowTodos, handleChange, handleSubmit, handleComplete, handleRemove, filterTodos }) => {
    
    return (
        <section className={className}>
            <Input handleChange={handleChange} handleSubmit={handleSubmit} nowTodos={nowTodos}/>
            <Todolist handleComplete={handleComplete} handleRemove={handleRemove} filterTodos={filterTodos}/>
        </section>
    )
}

export default Section;