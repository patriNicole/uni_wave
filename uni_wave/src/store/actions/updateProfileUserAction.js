import axios from "axios";
import { USER_UPDATED_SUCCESS, USER_UPDATED_FAIL } from "../types/authType.js";

export default function updateUserProfile(formData) {
    return async (dispatch) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/josn",
          },
          withCredentials: true
        };
        // fetch data from API
        const response = await axios.post(
          "http://localhost:8000/api/uniwave/update-user-profile",
          formData,
          config
        );
        if (response.data.success) {
          localStorage.removeItem("authToken");
          dispatch({
            // in authReducer
            type: USER_UPDATED_SUCCESS,
          });
        }
      } catch (error) {
        //action taken from the reducers
        dispatch({
            type: USER_UPDATED_FAIL,
            payload: {
              //from back-end there is the 'errorMessage'
              error: error.response.data.error.errorMessage,
            },
        });
      }
    };
  };
  