import { FRIEND_GET_SUCCESS } from "../types/messangerType.js";

// the friends array in the state object will be updated with 
// the new data provided in the payload property
const messengerState = {
  friends: [],
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
  return state;

};
