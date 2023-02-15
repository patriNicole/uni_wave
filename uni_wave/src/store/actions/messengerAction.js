import axios from "axios";
import { FRIEND_GET_SUCCESS } from "../types/messangerType.js";

export const getFriends = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/uniwave/get-friends"
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
