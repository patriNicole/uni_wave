import { TODO_INPUT_SUCCESS } from "../types/todoType.js";

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

  return state;
};
