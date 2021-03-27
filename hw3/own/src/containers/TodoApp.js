import React, { useState } from "react";
import Header from "../components/Header";
import Section from "../components/Section";
import Footer from "../components/Footer";

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");
    const [hasTask, sethasTask] = useState(false);
    const [count, setCount] = useState(0);
    

    const [nowTodos, setNowTodos] = useState("");

    const addTodo = (todo) => {
        if (!todo.text.length) {
            return;
        } else {
            setTodos((prevState) => [...prevState, todo]);
            setCount(count + 1);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        // console.log(value);
        setNowTodos(value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({
            text: nowTodos,
            id: Math.random().toFixed(5),
            completed: false
        });
        // console.log(todos);
        setNowTodos("");
    };

    const handleComplete = (id) => {
        setTodos((prevState) => prevState.map((todo) => {
            if (todo.id === id) {
                if (todo.completed) {
                    setCount(count+1);
                } else {
                    setCount(count-1);
                }
                return {...todo, completed: !todo.completed};
            } else {
                return todo;
            }
        }));
    };

    const handleRemove = (id) => {
        setTodos((prevState) => prevState.filter((todo) => {
            if (todo.id === id) {
                if (!todo.completed) {
                    setCount(count-1);
                }
                return false;
            } else {
                return true;
            }
        }));
    };

    const handleRemoveCompleted = () => {
        setTodos((prevState) => prevState.filter((todo) => !todo.completed));
    };

    const handleFilter = (type) => {
        setFilter(type);
    }
    

    let filterTodos = [];
    if (filter === "all") {
        filterTodos = todos;
    } else if (filter === "active") {
        filterTodos = todos.filter((todo) => !todo.completed);
    } else if (filter === "completed") {
        filterTodos = todos.filter((todo) => todo.completed);
    }

    return (
        <>
            <Header text="todos" />

            <Section className="todo-app__main" 
                    // addTodo={addTodo}
                    nowTodos={nowTodos}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleComplete={handleComplete}
                    handleRemove={handleRemove}
                    filterTodos={filterTodos} />

            {todos.length ? (
                <Footer className="todo-app__footer" 
                        count={count}
                        handleFilter={handleFilter}
                        handleRemoveCompleted={handleRemoveCompleted}
                        todos={todos} />
            ) : null}
        </>
    )
}

export default TodoApp;