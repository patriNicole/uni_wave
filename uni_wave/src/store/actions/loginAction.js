import axios from "axios";
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from "../types/authType.js";

export default function loginAction(data) {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      };
      // fetch data from API
      // REGISTRATION
      const response = await axios.post(
        "http://localhost:8000/api/uniwave/user-login",
        data,
        config
      );

      //after successful registration go to
      //inspect -> application -> Local Storage -> http://localhost:3000/
      localStorage.setItem("authToken", response.data.token);

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      //action taken from the reducers
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error: error.response.data.error.errorMessage,
        },
      });
    }
  };
}; 