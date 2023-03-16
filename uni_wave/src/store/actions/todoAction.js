import axios from "axios";
import { TODO_INPUT_SUCCESS, TODO_GET_SUCCESS, DELETE_TODO_SUCCESS, UPDATE_TODO } from "../types/todoType.js";

export const inputTodo = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/uniwave/input-todoList",
      data,
      { withCredentials: true }
    );
    //console.log(response.data)
    if (response.data.success) {
      //localStorage.removeItem("authToken");
      dispatch({
        type: TODO_INPUT_SUCCESS,
        payload: {
          todoList: response.data.todoList,
        },
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getToDo = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/uniwave/get-todoList",
      { withCredentials: true }
    );
    //console.log(response.data)
    if (response.data.success) {
      //localStorage.removeItem("authToken");
      dispatch({
        type: TODO_GET_SUCCESS,
        payload: {
          todoList: response.data.todoList,
        },
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

/* DELETE THE TODOLIST */
export const deleteTodo = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/uniwave/delete-id/${id}`,
        { withCredentials: true }
      );
      //console.log(response)
      dispatch({
        type: DELETE_TODO_SUCCESS,
        payload: id,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

/* EDIT THE TODO list */
export const updateTodo = (id, editedTodo) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/uniwave/update-todo/${id}`,
        editedTodo,
        { withCredentials: true }
      )
      //console.log(response.data);
      dispatch({
        type: UPDATE_TODO,
        payload: editedTodo,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
