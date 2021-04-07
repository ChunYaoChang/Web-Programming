import React, { Component } from "react";
class Checkrow extends React.Component{
    constructor(props){
        super(props);
    }
    
    renderdone = () => {
        if(this.props.isDone == true){
            // console.log('1342')
            return (
                <h1 className="todo-app__item-detail" style={{textDdecoration: "line-through", opacity: 0.5}}>{this.props.content}</h1>
            )
        }
        else{
            // console.log('124')
            return (
                <h1 className="todo-app__item-detail">{this.props.content}</h1>
            )
        }
    }

    render(){
        return(
            <li className="todo-app__item">
                <div className="todo-app__checkbox" key={this.props.itemid}>
                    <input type="checkbox" id={this.props.itemid} onClick={() => this.props.doneClick(this.props.itemid)}/>
                    <label htmlFor={this.props.itemid}/>
                </div>
                {this.renderdone()}
                <img src="./img/x.png" className="todo-app__item-x" onClick={() => this.props.removeClick(this.props.itemid)}/>
            </li>
        )
    }
}
export default Checkrow