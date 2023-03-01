import axios from "axios";
//import the type of the action taken
import { REGISTER_FAIL, REGISTER_SUCCESS } from "../types/authType.js";

export default function signupAction(data) {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/josn",
        },
        withCredentials: true
      };
      // fetch data from API
      // REGISTRATION
      const response = await axios.post(
        "http://localhost:8000/api/uniwave/register",
        data,
        config
      );

      //after successful registration go to
      //inspect -> application -> Local Storage -> http://localhost:3000/
      //localStorage.setItem("authToken", response.data.token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          //token: response.data.token,
        },
      });
      
    } catch (error) {
      //action taken from the reducers
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          //from back-end there is the 'errorMessage'
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
}
