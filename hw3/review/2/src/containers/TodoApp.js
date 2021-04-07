import React, { Component } from "react";
import Header from "../components/Header";
import TodoAddForm from "./TodoAddForm"

import type { Item } from "../components/TodoTypeDefinition.js"
import styles from "../components/styles.js"
import TodoItems from "./TodoItems";
import FOOTER from "./Footer.js"

class INPUT extends Component {
    state: {
        items: Array<Item>,
        value: String,
    }
    constructor() {
        super();
        this.state = {
            items: [],
        };
        this.handleItemAdd = this.handleItemAdd.bind(this);
        this.handleStylingItem = this.handleStylingItem.bind(this);
    }

    handleItemAdd = (aItem: Item) => {
        const newItems = [...this.state.items, aItem];
        console.log(newItems);

        this.setState({
            items: newItems,
        });

        
    }

    handleStylingItem = (index) => {
        const newItems = [...this.state.items];
        newItems[index].isCompleted = !newItems[index].isCompleted;
        console.log(index);
        this.setState({
            items: newItems,
        });
    }

    handleCompleted = () => {
        const Itemcopy = this.state.items;
        const ItemFinished = Itemcopy.filter(item => item.isCompleted === true);
        this.setState({
            items: ItemFinished,
        });
    }

    handleActive = () => {
        const Itemcopy = this.state.items;
        const ItemFinished = Itemcopy.filter(item => item.isCompleted !== true);
        this.setState({
            items: ItemFinished,
        });
    }

    render(){
        return (
            <div>
            <section className="todo-app__main">
                <TodoAddForm placeholderText = "What needs to be done?" onItemAdd={this.handleItemAdd} />
                <ul className="todo-app__list" id="todo-list">
                    {
                        this.state.items.map((item,index) => (
                            <TodoItems
                                key={index}
                                style={item.isCompleted? styles.itemCompleted: styles.itemNormal}
                                title={item.title}
                                onItemClick={() => {this.handleStylingItem(index)}}
                            />
                        ))
                    }
                </ul>
            </section>
            <FOOTER totalNumber={this.state.items.length}
                    onbtnClick={this.handleCompleted}
                    onbtnClickA={this.handleActive}
            />
            </div>
        );
    }
}

class TodoApp extends Component {
    render() {
        return (
            <>
                <Header text="todos" />
                <INPUT />
            </>
        );
    }
}

export default TodoApp;
