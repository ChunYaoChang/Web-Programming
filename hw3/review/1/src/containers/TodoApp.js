import React, { Component } from "react";
import Header from "../components/Header";
import Checkrow from "../components/Checkrow"


class TodoApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            num: 0,
            Currentitems:[]
        }
    }
    
    Addrow = (pressed) => {
        let value = document.querySelector(".todo-app__input").value
        if (pressed.keyCode == 13 && value){
            this.setState({Currentitems: [...this.state.Currentitems,{itemid: this.state.num, content: document.querySelector(".todo-app__input").value, isDone: false}]});
            this.setState({num: this.state.num + 1})
            document.querySelector(".todo-app__input").value = '';
            // console.log(this.state.Currentitems)
        }
    }

    removebuttonclick = (itemid) => {
        // console.log('WWOWO')
        var i = 0;
        for(i = 0; i < this.state.Currentitems.length; i++){
            // console.log(this.state.Currentitems[i].itemid)
            if (this.state.Currentitems[i].itemid === itemid){
                this.state.Currentitems.splice(i, 1);
                this.setState({Currentitems: this.state.Currentitems})
            }
        }
    }

    doneclick = (itemid) => {
        var i = 0;
        let items = this.state.Currentitems;
        for(i = 0; i < items.length; i++){
            if (items[i].itemid ==itemid){
                if(items[i].isDone == true){
                    items[i].isDone = false;
                }else{
                    // console.log('WOWO')
                    items[i].isDone = true;
                    // console.log(items[i].isDone )
                }
            }
        }
        this.setState({Currentitems: items})
    }
    
    Numofleft = () => {
        let num = 0;
        var i = 0;
        for (i = 0; i < this.state.Currentitems.length; i++){
            if(this.state.Currentitems[i].isDone == false){
                num++;
            }
        }
        return num;
    }

    Addfooter = () => {
        if (this.state.Currentitems.length > 0){
            return (
                <footer className="todo-app__footer" id="todo-footer">
                    <div className="todo-app__total">{this.Numofleft()} left</div>
                    <ul className="todo-app__view-buttons">
                        <button>All</button>
                        <button>Active</button>
                        <button>Completed</button>
                    </ul>
                    <div className="todo-app__clean">Clear completed</div>
                </footer>
            )
        }
    }



    render() {
        return (
            <div>
                <Header text="todos" />
                <section className="todo-app__main">
                    <input placeholder="What needs to be done?" className="todo-app__input" onKeyDown={this.Addrow}/>
                    <ul className="todo-app__list" id="todo-list">
                    {this.state.Currentitems.map(rowitem => <Checkrow itemid={rowitem.itemid} content={rowitem.content} isDone={rowitem.isDone} removeClick={this.removebuttonclick} doneClick={this.doneclick}/>)}
                    </ul>
                </section>
                {this.Addfooter()}
            </div>
        );
    }
}

export default TodoApp
