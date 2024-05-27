import React,{ useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";



function TodoApp() {
    const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  return (
    <div className="App">
      <h1>My To Do List</h1>

      <div className="todo-wrapper">
        <div className="inputs">
          <div className="input-item">
            <label htmlFor="">Title</label>
            <input type="text" palceholder="title"/>
          </div>
          <div className="input-item">
            <label htmlFor="">Description</label>
            <input type="text" palceholder="descriptions"/>
          </div>
          <div className="input-item">
            <button type="button" className="primarybtn">
              ADD
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} 
          onClick={() => setIsCompleteScreen(false)}
          >ToDo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} 
          onClick={() => setIsCompleteScreen(true)}
          >Completed</button>
        </div>

        <div className="todo-list">
          <div className="todo-list-item">
            <div>
            <h3>Task 1</h3>
            <p>Description</p>
            </div>

            <div>
            <BsCheckLg className="check-icon"/>
            <AiOutlineDelete className="delete-icon"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
