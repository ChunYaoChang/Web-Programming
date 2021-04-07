import React, { Component } from "react"
import type { TodoAddFormProps } from "../components/TodoTypeDefinition.js"

let count = -1;

const TodoAddFrom = ( { placeholderText, onItemAdd }: TodoAddFormProps ) => {
//class TodoAddForm extends Component{
    /*constructor(props){
        super(props);
        this.state = {
            count: 0,
        };
    }*/
    
    const Increment = (num) => {
        return(num+1);
    };

    //render (){
    let titleField: any = null;
    return (
        <input className='todo-app__input' 
            placeholder={placeholderText} 
            type="text"
            ref={el => titleField = el}
            onKeyDown={(e) => {
                if(e.key === "Enter"){
                    count = Increment(count);
                    onItemAdd({
                        id: count,
                        title: titleField.value,
                        isCompleted: false,
                    });
                    titleField.value = "";
                }
                
             }
            }
            //value={this.state.value} 
            //onChange={this.handleChange} 
            //onKeyDown={this.handleKeyDown}
        />
    )
}

export default TodoAddFrom