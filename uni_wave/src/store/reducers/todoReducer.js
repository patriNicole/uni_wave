import { TODO_INPUT_SUCCESS, TODO_GET_SUCCESS, DELETE_TODO_SUCCESS, UPDATE_TODO } from "../types/todoType.js";

const todoState = {
  todoList: [],
};

export const todoReducer = (state = todoState, action) => {
  // the type property is typically used to identify the type of action being performed
  // the payload property is used to provide additional data to the reducer function
  const { type, payload } = action;

  if (type === TODO_INPUT_SUCCESS) {
    return {
      ...state,
      // The new todoList array contains all the elements of the previous todoList array,
      // as well as the new payload.todoList object added to the end of the array
      todoList: [...state.todoList, payload.todoList],
    };
  }

  if (type === TODO_GET_SUCCESS) {
    return {
      //updating the state of the application with the latest message retrieved from the server
      ...state,
      todoList: payload.todoList,
    };
  }

  if(type === DELETE_TODO_SUCCESS) {
    const filteredTodos= state.todoList.filter(post => post._id !== action.payload);
    //console.log(filteredTodos)
    return {
      //updating the state of the application with the latest message retrieved from the server
      ...state,
      todoList: filteredTodos,
    };
  }

  if (type === UPDATE_TODO) {
    // Find the todos' index which we want to change
    const updatedTodoIndex = state.todoList.findIndex((post) => post._id === payload._id);
    // Get the updated todos' state
    const updatedTodo = [...state.todoList];
    // Equal it with the new state from payload
    updatedTodo[updatedTodoIndex] = payload;
    return {
      ...state,
      todoList: updatedTodo,
    };
  }

  return state;
};
