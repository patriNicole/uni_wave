import React, { useState, useRef, useEffect } from "react";
import "./Todo.css";
import Select from "react-select";
import { CgCloseR } from "react-icons/cg";
import { TiEdit } from "react-icons/ti";

import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import { getToDo, deleteTodo, updateTodo } from "../../../../store/actions/todoAction.js";

export default function ToDoList({
  category,
  todoList,
  userInfo,
  setTodos,
  todos,
}) {
  //dispach the action from the store
  //working with reducer
  const dispatch = useDispatch();

  const socket = useRef();
  useEffect(() => {
    // Socket is running on 8080
    socket.current = io("ws://localhost:8080");
  });

  useEffect(() => {
    dispatch(getToDo());
  }, []);

  // When a Todo is edited
  useEffect(() => {
    socket.current.on("update-todo", () => {
      dispatch(getToDo()); // Fetch updated todo list
    });
    return () => socket.current.off("update-todo");
  }, [dispatch]);

  // reduce() method on the todos array, which iterates through
  // each element of the array and reduces it to a single value
  const todosByCategory = todoList.reduce((acc, todo) => {
    const category = todo.category;
    // acc = accumulator
    acc[category] = acc[category] || [];
    // current todo is pushed to the array
    // corresponding to its category key
    acc[category].push(todo);
    return acc;
  }, {});

  const [editText, setEditText] = useState("");
  const [editing, setEditing] = useState(false);

  const textRef = useRef(); 
  const categoryRef = useRef();

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteTodo(id));
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();
    if (textRef.current.value.trim() === "") return
    const editedTodo = {
      ...todos.find((todo) => todo._id === id),
      text: textRef.current.value,
      category: categoryRef.current.value,
    };
    //console.log(editedTodo)
    await dispatch(updateTodo(id, editedTodo));
    setEditText("");
    // Emit message to server with updated todo
    socket.current.emit("update-todo", editedTodo);
  };

  const onEdit = (e, text) => {
    e.preventDefault();
    setEditText(text);
    setEditing(true);
  };

  // handle cancel button click
  const handleCancel = (e) => {
    e.preventDefault();
    setEditing(false);
    setEditText("");
  };

  return (
    <>
      <div className="todo-list-container">
        {todosByCategory[category.value] && (
          <div className="todo-category" key={category.value}>
            <ul className="todo-list">
              {todosByCategory[category.value].map(
                (todo) =>
                  todo.senderName === userInfo.username && (
                    <li
                      className={editText === todo.text ? "todo-row-edit" : "todo-row"}
                      key={todo._id}
                    >
                      {editing && editText === todo.text ? (
                        <div className="editFields">
                          <textarea
                            ref={textRef}
                            defaultValue={todo.text}
                            className="textTodoEdit"
                          />
                          <textarea
                            ref={categoryRef}
                            defaultValue={todo.category}
                            className="categoryTodoEdit"
                          />
                        </div>
                      ) : (
                        todo.text
                      )}
                      <div className="iconsTodo">
                        {editing && editText === todo.text ? (
                          <>
                          <button
                            onClick={(e) => handleEdit(e, todo._id)}
                            className="saveCancelEditTodo"
                          >
                            Save
                          </button>
                          <button
                            onClick={(e) => {handleCancel(e)}}
                            className="saveCancelEditTodo"
                          >
                            Cancel
                          </button>
                          </>
                        ) : (
                          <>
                            <CgCloseR
                              onClick={(e) => handleDelete(e, todo._id)}
                              className="delete-iconTodo"
                            />
                            <TiEdit
                              onClick={(e) => onEdit(e, todo.text)}
                              className="edit-iconTodo"
                            />
                          </>
                        )}
                      </div>
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
