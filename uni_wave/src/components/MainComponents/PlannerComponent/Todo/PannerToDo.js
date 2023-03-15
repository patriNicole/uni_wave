import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import Select from "react-select";
import { CgCloseR } from "react-icons/cg";
import { TiEdit } from "react-icons/ti";

import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import { inputTodo } from '../../../../store/actions/todoAction.js';

const optionsCategory = [
  { value: "university", label: "University" },
  { value: "priority", label: "Priority" },
  { value: "projects", label: "Projects" },
];

function TodoList() {
  //dispach the action from the store
  //working with reducer
  const dispatch = useDispatch();

  const socket = useRef();
  useEffect(() => {
    // Socket is running on 8080
    socket.current = io("ws://localhost:8080");
  });

  /* Used user info as appears (Redux) when logged in in application */
  const { userInfo } = useSelector((state) => state.auth); 
  const { todoList } = useSelector((state) => state.toDo);

  const [todos, setTodos] = useState([]);
  const [inputUser, setInputUser] = useState("");
  const [category, setCategory] = useState(optionsCategory[0]);
  const [categories, setCategories] = useState(optionsCategory);
  const [newCategory, setNewCategory] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const handleChange = (e) => {
    setInputUser(e.target.value);
  };

  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption);
  };

  /* Input Course */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUser.trim() === "") return;
    const newTodo = {
      senderId: userInfo.id,
      senderName: userInfo.username,
      text: inputUser,
      category: category.value,
      completed: false,
    };
    setTodos([ ...todos, newTodo ]);
    dispatch(inputTodo(newTodo));
    setInputUser("");
  };

  /*const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };*/

  // reduce() method on the todos array, which iterates through
  // each element of the array and reduces it to a single value
  const todosByCategory = todos.reduce((acc, todo) => {
    const category = todo.category;
    // acc = accumulator
    acc[category] = acc[category] || [];
    // current todo is pushed to the array
    // corresponding to its category key
    acc[category].push(todo);
    return acc;
  }, {});

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleNewCategorySubmit = (e) => {
    e.preventDefault();
    const newCategoryObj = { value: newCategory, label: newCategory };
    setCategories([...categories, newCategoryObj]);
    setNewCategory("");
  };

  const handleCategoryDelete = (categoryToDelete) => {
    setCategories(categories.filter((c) => c.value !== categoryToDelete));
    setTodos(todos.filter((t) => t.category !== categoryToDelete));
  };

  return (
    <div className="todoLists">
      <h1>My To-Do List</h1>
      <div className="todo-container">
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            autoComplete="off"
            placeholder="Add a task"
            value={inputUser}
            onChange={handleChange}
            name="text"
            className="todo-input"
          />
          <button onClick={handleSubmit} className="todo-button">
            Add To-Do
          </button>
          <Select
            options={categories}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "#3406ff" : "#5d0cff",
                width: "40%",
                height: "10%",
              }),
            }}
            onChange={handleCategoryChange}
            value={category}
          />
        </form>
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="showCategoryButton"
        >
          {showCategories ? "Hide Categories" : "Show Categories"}
        </button>
        {showCategories && (
          <div className="categories-container">
            <h2>Categories</h2>
            <ul>
              {categories.map((c) => (
                <li key={c.value} className="allCategories">
                  <p className="categoryTitleAll">{c.label}</p>
                  <button onClick={() => handleCategoryDelete(c.value)} className="addNewCategoryButton">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <form onSubmit={handleNewCategorySubmit} className="addNewCategory">
              <input
                className="addNewCategoryInput"
                placeholder="New category"
                value={newCategory}
                onChange={handleNewCategoryChange}
              />
              <button type="submit" className="addNewCategoryButton">Add</button>
            </form>
          </div>
        )}
        {!showCategories && (
          <div className="todo-list-container">
            {todosByCategory[category.value] && (
              <div className="todo-category" key={category.value}>
                <h2>{category.label}</h2>
                <ul className="todo-list">
                  {todosByCategory[category.value].map((todo) => (
                    <li className="todo-row" key={todo}>
                      {todo.text}
                      <div className="iconsTodo">
                        <CgCloseR
                          //onClick={() => handleDelete(todo.id)}
                          className="delete-iconTodo"
                        />
                        <TiEdit
                          //onClick={() => setEdit({ id: todo.id, value: todo.text, category: todo.category })}
                          className="edit-iconTodo"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
