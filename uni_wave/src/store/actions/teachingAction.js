import axios from "axios";
import { TEACHING_INPUT_SUCCESS } from "../types/teachingType.js";

export const inputCourse = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/uniwave/input-course",
      data,
      { withCredentials: true }
    );
    //console.log(response)
    /*if (response.data.success) {
      //localStorage.removeItem("authToken");
      dispatch({
        // in teachingType
        type: TEACHING_INPUT_SUCCESS,
      });
    }*/
  } catch (error) {}
};