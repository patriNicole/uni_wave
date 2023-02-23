import { FRIEND_GET_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS, SOCKET_MESSAGE } from "../types/messangerType.js";

// the friends array in the state object will be updated with 
// the new data provided in the payload property
const messengerState = {
  friends: [],
  message : []
};

export const messengerReducer = (state = messengerState, action) => {

  // the type property is typically used to identify the type of action being performed
  // the payload property is used to provide additional data to the reducer function
  const { type, payload } = action;

  if (type === FRIEND_GET_SUCCESS) {
    return {
      ...state,
      friends: payload.friends,
    };
  }

  //MESSAGE_GET_SUCCESS is a type of action that indicates that a message 
  //has been successfully retrieved from a server, and payload is the data 
  //attached to the action, which includes the retrieved message.
  if(type === MESSAGE_GET_SUCCESS){
    return {
      //updating the state of the application with the latest message retrieved from the server
         ...state,
         message : payload.message
    }
  }

  if(type === MESSAGE_SEND_SUCCESS){
    return {
         ...state,
         // The new message array contains all the elements of the previous message array, 
         // as well as the new payload.message object added to the end of the array
         message : [...state.message,  payload.message]
    }
  }

  if(type === SOCKET_MESSAGE){
    return {
         ...state,
         message : [...state.message, payload.message]
    }
  }

  return state;

};