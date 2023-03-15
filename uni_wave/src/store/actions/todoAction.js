import axios from "axios";
import { TODO_INPUT_SUCCESS, TODO_GET_SUCCESS } from "../types/todoType.js";

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