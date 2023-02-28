import { FRIEND_GET_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS, SOCKET_MESSAGE, UPDATE_FRIEND_MESSAGE, MESSAGE_SEND_SUCCESS_CLEAR, SEEN_MESSAGE, DELIVERED_MESSAGE, UPDATE, MESSAGE_GET_SUCCESS_CLEAR, SEEN_ALL } from "../types/messangerType.js";

// the friends array in the state object will be updated with 
// the new data provided in the payload property
const messengerState = {
  friends: [],
  message : [],
  messageSentSuccessfully : false,
  // From deliver icon to seen icon
  message_get_success : false
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
         // From deliver icon to seen icon
         message_get_success : true,
         message : payload.message
    }
  }

  if(type === MESSAGE_SEND_SUCCESS){
    return {
         ...state,
         messageSentSuccessfully : true,
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

  // GET ONLY LAST MNESSAGE TO DISPLAY AS NOTIFICATION ON THE LEFT
  if(type === UPDATE_FRIEND_MESSAGE){
    // friends from list above
    const index = state.friends.findIndex(friend => friend.friendInfo._id === payload.messageInfo.receiverId || friend.friendInfo._id === payload.messageInfo.senderId);
    // In state only remember last message from the user
    state.friends[index].messageInfo = payload.messageInfo;
    // Update Status Dynamically
    state.friends[index].messageInfo.status = payload.status;
    return state;
  }

  // CLEAR LAST MESSAGE AFTER SENT TO USER
  if(type === MESSAGE_SEND_SUCCESS_CLEAR) {
    return {
      ...state,
      messageSentSuccessfully: false
    }
  }

  // SEEN MESSAGE
  // GET ONLY LAST MNESSAGE TO DISPLAY AS NOTIFICATION ON THE LEFT
  if(type === SEEN_MESSAGE){
    // friends from list above
    const index = state.friends.findIndex(friend => friend.friendInfo._id === payload.messageInfo.receiverId || friend.friendInfo._id === payload.messageInfo.senderId);
    // In state only remember last message from the user
    state.friends[index].messageInfo.status = 'seen';
    return {
      ...state
    };
  }

  // DELIVER MESSAGE
  // GET ONLY LAST MNESSAGE TO DISPLAY AS NOTIFICATION ON THE LEFT
  if(type === DELIVERED_MESSAGE){
    // friends from list above
    const index = state.friends.findIndex(friend => friend.friendInfo._id === payload.messageInfo.receiverId || friend.friendInfo._id === payload.messageInfo.senderId);
    // In state only remember last message from the user
    state.friends[index].messageInfo.status = 'delivered';
    return {
      ...state
    };
  }

  // UPDATE WHEN MESSAGE SEEN -> when user sees message => unseen to seen
  if(type === UPDATE){
    const index = state.friends.findIndex(friend => friend.friendInfo._id === payload.id);
    if(state.friends[index].messageInfo){
      state.friends[index].messageInfo.status = 'seen';
    }
    return {
         ...state
    }
  }

  // UPDATE FROM DELIVERED TO SEEN 
  if(type === 'SEEN_ALL'){
    const index = state.friends.findIndex(friend => friend.friendInfo._id === payload.receiverId);
    state.friends[index].messageInfo.status = 'seen';
    return {
         ...state
    }
  }

  // MESSAGE GOT SUCCESSFULLY CLEAR
  if(type === MESSAGE_GET_SUCCESS_CLEAR){
    return {
         ...state,
         message_get_success : false
    }
  }

  return state;

};
