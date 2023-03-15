import React, { useState } from "react";
import "./Todo.css";
import Select from "react-select";
import { CgCloseR } from "react-icons/cg";
import { TiEdit } from "react-icons/ti";

const optionsCategory = [
  { value: "university", label: "University" },
  { value: "priority", label: "Priority" },
  { value: "projects", label: "Projects" },
  { value: "shopping", label: "Shopping" },
  { value: "work", label: "Work" },
  { value: "others", label: "Others" },
];

function TodoList() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUser.trim() === "") return;
    const newTodo = {
      id: Math.floor(Math.random() * 10000),
      text: inputUser,
      category: category.value,
    };
    setTodos([...todos, newTodo]);
    setInputUser("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

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
          <button onClick={() => setShowCategories(!showCategories)}>
            {showCategories ? "Hide Categories" : "Show Categories"}
          </button>
        </form>
        {showCategories && (
          <div className="categories-container">
            <h2>Categories</h2>
            <ul>
              {categories.map((c) => (
                <li key={c.value}>
                  {c.label}
                  <button onClick={() => handleCategoryDelete(c.value)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <form onSubmit={handleNewCategorySubmit}>
              <input
                placeholder="New category"
                value={newCategory}
                onChange={handleNewCategoryChange}
              />
              <button type="submit">Add</button>
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
                    <li className="todo-row" key={todo.id}>
                      {todo.text}
                      <div className="iconsTodo">
                        <CgCloseR
                          onClick={() => handleDelete(todo.id)}
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
