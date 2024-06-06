import React, { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function TodoApp() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [CompletedTodo, setCompletedTodo] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  const HandleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const HandleCompleteTodo = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let CompletedOn =
      dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      CompletedOn: CompletedOn,
    };

    let updatedCompletedArr = [...CompletedTodo];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodo(updatedCompletedArr);
    HandleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));

  };

  const HandleDeleteCompletedTodo = (index)=> {
    let reducedTodo = [...CompletedTodo];
    reducedTodo.splice(index, 1);
    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompletedTodo(reducedTodo);
  }

  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem("todolist"));
    let savedCopmletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }

    if(savedCopmletedTodo){
      setCompletedTodo(savedCopmletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>My To Do List</h1>

      <div className="todo-wrapper">
        <div className="inputs">
          <div className="input-item">
            <label htmlFor="">Title</label>
            <input
              type="text"
              palceholder="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="input-item">
            <label htmlFor="">Description</label>
            <input
              type="text"
              palceholder="descriptions"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className="input-item">
            <button
              type="button"
              className="primarybtn"
              onClick={handleAddTodo}
            >
              ADD
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            ToDo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen === false && allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <div>
                    <BsCheckLg
                      className="check-icon"
                      title="Complete"
                      onClick={() => HandleCompleteTodo(index)}
                    />
                    <AiOutlineDelete
                      className="delete-icon"
                      title="Delete"
                      onClick={() => HandleDeleteTodo(index)}
                    />
                  </div>
                </div>
              );
            })}

            {isCompleteScreen === true && CompletedTodo.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p><small>Completed On: {item.CompletedOn}</small></p>
                  </div>

                  <div>
                    <AiOutlineDelete
                      className="delete-icon"
                      title="Delete"
                      onClick={() => HandleDeleteCompletedTodo(index)}
                    />
                  </div>
                </div>
              );
            })}

        </div>
      </div>
    </div>
  );
}

export default TodoApp;
