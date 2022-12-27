import "./App.css";
import React, { useState } from "react";
function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [triggerTask, setTriggerTask] = useState(false);
  const [isAnyCompletedTask, setIsAnyCompletedTask] = useState(false);
  const addData = () => {
    if (input === null || input === "") {
      alert("Need to type something");
      return;
    }
    const newToDo = {
      id: new Date().getTime(),
      text: input,
      completed: false,
    };
    setTodos((todo) => {
      const updatedList = [...todo].concat(newToDo);
      console.log(updatedList);
      setInput("");
      return updatedList;
    });
  };
  function removeData(key) {
    const updatedList = todos.filter((todo) => todo.id !== key);
    setTodos(updatedList);
  }
  const handleCheckBox = (key) => {
    let isCheckBoxClicked = false;
    todos.forEach((todo) => {
      if (todo.id === key) {
        todo.completed = !todo.completed;
      }
      if (todo.completed) {
        isCheckBoxClicked = true;
      }
    });
    setTodos([...todos]);
    setIsAnyCompletedTask(isCheckBoxClicked);
  };
  const handleComplete = () => {
    setTriggerTask(true);
  };
  return (
    <div className="App">
      <h1 className="title">To do app</h1>
      <div className="search">
        <input
          type="search"
          placeholder="Enter your task here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button onClick={addData}>Add</button>
      </div>
      {todos.map((todo) => (
        <div key={todo.id} className="list">
          <div className="todolist">{todo.text}</div>
          <div>
            <input
              className="checkbox"
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheckBox(todo.id)}
            ></input>
            <button onClick={() => removeData(todo.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="btns">
        {todos.length >= 1 && (
          <button className="remove" onClick={() => setTodos([])}>
            Remove All
          </button>
        )}
        <button
          clasName="complete_task"
          onClick={handleComplete}
          disabled={!isAnyCompletedTask}
        >
          Complete Task
        </button>
        {triggerTask &&
          todos.map(
            (todo) =>
              todo.completed && (
                <div key={todo.id} className="list">
                  <div className="todolist">{todo.text}</div>
                </div>
              )
          )}
      </div>
    </div>
  );
}
export default App;
