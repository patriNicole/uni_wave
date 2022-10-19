import React, { useState, useEffect, useRef } from "react";
import "./Todo.css";
//categories for Todo List
import Select from 'react-select';

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
      //set the category for each Todo item
      category: props.showCategory
    });
    //reset the input to empty
    setInputUser("");
  };

  /* Categories for ToDo List */
  //when a new input is added to the to-do
  const handleChange = (e) => {
    setInputUser(e.target.value);
  };

  //categories for Todo list
  const optionsCategory = [
    { value: 'university', label: 'University' },
    { value: 'priority', label: 'Priority' },
    { value: 'projects', label: 'Projects' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'work', label: 'Work' },
    { value: 'others', label: 'Others' },
  ]

  //set the category for each Todo item
  const handleChangeCategory = event => {
    //console.log(event.value);
    props.setCategory(event.value);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {! props.edit ? (
        <>
          <input
            autoComplete="off"
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
          {/* Added A Filtering/Categories for the Todo List */}
          <Select options={optionsCategory} 
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? '#3406ff' : '#5d0cff',
                width: '40%',
                height: '10%'
              }),
            }}
            onChange={handleChangeCategory}
            defaultValue={{ value: 'university', label: 'University' }}
          />
        </>
      ) : (
        <>
          <input
            autoComplete="off"
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
          {/* Added A Filtering/Categories for the Todo List */}
          <Select options={optionsCategory} 
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? '#3406ff' : '#5d0cff',
                width: '40%',
                height: '10%'
              }),
            }}
            onChange={handleChangeCategory}
            defaultValue={{ value: 'university', label: 'University' }}
          />
        </>
      )}
    </form>
  );
}
