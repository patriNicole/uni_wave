import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import Select from "react-select";
import { CgCloseR } from "react-icons/cg";
import { TiEdit } from "react-icons/ti";

import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import { getToDo } from "../../../../store/actions/todoAction.js";

export default function ToDoList({ todos, category }) {
  //dispach the action from the store
  //working with reducer
  const dispatch = useDispatch();
  /* Used user info as appears (Redux) when logged in in application */
  const { userInfo } = useSelector((state) => state.auth);
  const { todoList } = useSelector((state) => state.toDo);
  console.log(todoList);

  const socket = useRef();
  useEffect(() => {
    // Socket is running on 8080
    socket.current = io("ws://localhost:8080");
  });

  useEffect(() => {
    dispatch(getToDo());
  }, []);

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

  /*const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    };*/

  return (
    <>
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
    </>
  );
}