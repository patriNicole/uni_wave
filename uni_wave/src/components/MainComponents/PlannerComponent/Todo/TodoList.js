import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import "./Todo.css";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  //add a new task to the list of tasks
  const addTodoTask = (todo) => {
    //if only white space added then do not add to todo
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    //create a new array having all the todos and adding the new todo
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    //console.log(...todos);
  };

  const updateTodo = (todoId, newValueTodo) => {
    if (!newValueTodo.text || /^\s*$/.test(newValueTodo.text)) {
      return;
    }

    setTodos((prevListTodo) =>
    prevListTodo.map((item) => (item.id === todoId ? newValueTodo : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTask = (id) => {
    let updateTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updateTodo);
  };

  return (
    <div className="todoLists">
      <h1>My To-Do List</h1>
      <TodoForm onSubmit={addTodoTask} />
      <Todo
        todos={todos}
        removeTodo={removeTodo}
        completeTask={completeTask}
        updateTodo={updateTodo}
      />
    </div>
  );
}
