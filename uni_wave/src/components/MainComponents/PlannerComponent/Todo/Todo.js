import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { CgCloseR } from "react-icons/cg";
import { TiEdit } from "react-icons/ti";
import "./Todo.css";

const Todo = (props) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
    category: ""
  });

  //console.log(edit)

  const submitUpdate = (value) => {
    props.updateTodo(edit.id, value, props.showCategory);
    //prepare value for next editing
    setEdit({
      id: null,
      value: "",
      category: ""
    });
  };

  //if we want to edit an item, then add a new form for editing
  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} showCategory={props.showCategory} setCategory={props.setCategory}/>;
  }

  return props.todoFiltered.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      <div key={todo.id} onClick={() => props.completeTask(todo.id)}>
        {todo.text}
      </div>
      <div className="iconsTodo">
        <CgCloseR
          onClick={() => props.removeTodo(todo.id)}
          className="delete-iconTodo"
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text, category: todo.category })}
          className="edit-iconTodo"
        />
      </div>
    </div>
  ));
};

export default Todo;