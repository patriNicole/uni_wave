import axios from "axios";
import { LOGOUT_SUCCESS } from "../types/authType.js";

export const userLogout = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/uniwave/user-logout",
      data,
      { withCredentials: true }
    );
    if (response.data.success) {
      localStorage.removeItem("authToken");
      dispatch({
        // in authReducer
        type: LOGOUT_SUCCESS,
      });
    }
  } catch (error) {}
};
