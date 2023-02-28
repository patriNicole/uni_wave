import { REGISTER_FAIL, REGISTER_SUCCESS, SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../types/authType.js";
import deCodeToken from "jwt-decode";

//the purpose of this function is to handle changes
//to the state of an authentication-related data store

const authState = {
  loading: true,
  //if user logged in or not
  authenticate: false,
  error: "",
  //if user registered successfully
  successMessage: "",
  //take user information
  userInfo: "",
};

/* DECODE TOKEN SO THAT WE CAN GET USER INFO */
const tokenDecode = (token) => {
  const tokenDecoded = deCodeToken(token);
  //take the expiration time of our tokenDecoded * 1000 mili-sec
  //how much time left from the 1 day set in backend
  const expTime = new Date(tokenDecoded.exp * 1000);
  //if token expired then return null
  if (new Date() > expTime) {
    return null;
  }
  return tokenDecoded;
};

/* IF USER REFRESHES THE PAGE, USER STILL REGISTERED UNTIL TOKEN EXPIRES */
//get the token from local storage of browser
const getToken = localStorage.getItem("authToken");
//if there is a token
if (getToken) {
  //get all the user info from token
  const getUserInfo = tokenDecode(getToken);
  //if there is user info
  if (getUserInfo) {
    //if user is registering his info will be stored
    //till the token is expiring
    authState.userInfo = getUserInfo;
    //user already registered as token key still available
    authState.authenticate = true;
    authState.loading = false;
  }
}

/* CONSTRUCT THE REDUCER */

//state is the current state of the store, and
//action is an object that describes the action to be taken.
export const authReducer = (state = authState, action) => {
  //payload is a term commonly used in Redux to refer to the data that is carried by an action
  //type field represents the type of the action that is being performed
  //load both of them into action
  //The two fields { payload, type } will be added to the token!
  const { payload, type } = action;

  if (type === REGISTER_FAIL || type === USER_LOGIN_FAIL) {
    //return the authState updated after registration failed
    return {
      ...state,
      error: payload.error,
      //user will not be logged in
      authenticate: false,
      //no data taken for user
      userInfo: "",
      loading: true,
    };
  }

  if (type === REGISTER_SUCCESS || type === USER_LOGIN_SUCCESS) {
    //the token contains the data of user which needs to be decoded
    const userInfo = tokenDecode(payload.token);
    return {
      ...state,
      userInfo: userInfo,
      successMessage: payload.successMessage,
      error: "",
      authenticate: true,
      loading: false,
    };
  }

  if (type === SUCCESS_MESSAGE_CLEAR) {
    return {
      ...state,
      successMessage: "",
    };
  }

  if (type === ERROR_CLEAR) {
    return {
      ...state,
      error: "",
    };
  }

  /* LOGOUT USER */
  if(type === LOGOUT_SUCCESS) {
    return {
      ...state,
      authenticate : false,
      userInfo : '',
      successMessage: 'Logout Successfull',

    }
  }

  return state;
};
