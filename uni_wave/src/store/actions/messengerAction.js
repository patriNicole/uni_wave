import axios from "axios";
import { FRIEND_GET_SUCCESS, MESSAGE_GET_SUCCESS } from "../types/messangerType.js";

export const getFriends = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/uniwave/get-friends",
      { withCredentials: true }
    );
    //console.log(response.data);

    dispatch({
      type: FRIEND_GET_SUCCESS,
      payload: {
        friends: response.data.friends,
      },
    });
  } catch (error) {
    console.log(error.response.data);
  }
};

/* data is the message itself */
export const messageSend = (data) => async (dispatch) => {
  //console.log(data)
  try {
    const response = await axios.post(
      "http://localhost:8000/api/uniwave/send-message",
      data,
      { withCredentials: true }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getMessage = (id) => {
  return async (dispatch) => {
    /* USER WHO IS SELECTED */
    try {
      const response = await axios.get(
        `http://localhost:8000/api/uniwave/get-message/${id}`,
        { withCredentials: true }
      );
      //console.log(response.data.message);
      dispatch({
        type : MESSAGE_GET_SUCCESS,
        payload : {
         message : response.data.message
        }
      })
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
