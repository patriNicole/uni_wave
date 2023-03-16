import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import { inputTodo } from "../../../../store/actions/todoAction.js";

import ToDoList from "./ToDoList.js";

const optionsCategory = [
  { value: "university", label: "University" },
  { value: "priority", label: "Priority" },
  { value: "projects", label: "Projects" },
];

function TodoList({ todos, setTodos }) {
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
  //console.log(todoList);

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
    setTodos([...todos, newTodo]);
    socket.current.emit("newTodo", newTodo);
    dispatch(inputTodo(newTodo));
    setInputUser("");
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleNewCategorySubmit = (e) => {
    e.preventDefault();
    const newCategoryObj = { value: newCategory, label: newCategory };
    setCategories([...categories, newCategoryObj]);
    setNewCategory("");
  };

  /*
  const handleCategoryDelete = (categoryToDelete) => {
    setCategories(categories.filter((c) => c.value !== categoryToDelete));
    setTodos(todos.filter((t) => t.category !== categoryToDelete));
  };
  */

  useEffect(() => {
    if (todoList) {
      const filteredTodoList = todoList.filter(
        (todo) => todo.senderName === userInfo.username
      );
      const todoListCategories = filteredTodoList.map((todo) => todo.category);
      const uniqueCategories = [...new Set(todoListCategories)];
      const newCategories = uniqueCategories
        .filter(
          (category) => !optionsCategory.some((c) => c.value === category)
        )
        .map((category) => ({ value: category, label: category }));
      setCategories([...optionsCategory, ...newCategories]);
    }
  }, [todoList, userInfo.username]);

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
                  {/*<button
                    onClick={() => handleCategoryDelete(c.value)}
                    className="addNewCategoryButton"
                  >
                    Delete
                </button>*/}
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
              <button type="submit" className="addNewCategoryButton">
                Add
              </button>
            </form>
          </div>
        )}
        {!showCategories && (
          <ToDoList
            todos={todos}
            category={category}
            todoList={todoList}
            userInfo={userInfo}
            setTodos={setTodos}
          />
        )}
      </div>
    </div>
  );
}

export default TodoList;
