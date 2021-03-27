import React from "react";
import ReactDOM from "react-dom";
import TodoApp from "./containers/TodoApp";

ReactDOM.render(
    <React.StrictMode>
        <TodoApp className="todo-app__root" />
    </React.StrictMode>,
    document.getElementById("root")
);

