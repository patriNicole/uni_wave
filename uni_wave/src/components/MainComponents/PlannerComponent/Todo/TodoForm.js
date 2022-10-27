import React, { useState, useEffect, useRef } from "react";
import "./Todo.css";

export default function TodoForm(props) {
  const [inputUser, setInputUser] = useState(props.edit ? props.edit.value : "");

  const inputRefToDo = useRef(null);

  useEffect(() => {
    //focus on what it is put as reference
    inputRefToDo.current.focus();
  });

  const handleSubmit = (e) => {
    //prevent page from refreshing
    e.preventDefault();

    props.onSubmit({
      //each time generates a new random id number
      id: Math.floor(Math.random() * 10000),
      //the input that we got from the user
      text: inputUser,
    });
    //reset the input to empty
    setInputUser("");
  };

  //when a new input is added to the to-do
  const handleChange = (e) => {
    setInputUser(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {! props.edit ? (
        <>
          <input
            autocomplete="off"
            placeholder="Add a task"
            value={inputUser}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputRefToDo}
          />
          <button onClick={handleSubmit} className="todo-button">
            Add To-Do
          </button>
        </>
      ) : (
        <>
          <input
            autocomplete="off"
            placeholder="Update the task"
            value={inputUser}
            onChange={handleChange}
            name="text"
            ref={inputRefToDo}
            className="todo-input edit"
          />
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
        </>
      )}
    </form>
  );
}
