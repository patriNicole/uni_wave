import axios from "axios";
import { TEACHING_INPUT_SUCCESS, TEACHING_GET_SUCCESS, DELETE_COURSE_SUCCESS } from "../types/teachingType.js";

export const inputCourse = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/uniwave/input-course",
      data,
      { withCredentials: true }
    );
    //console.log(response.data)
    if (response.data.success) {
      //localStorage.removeItem("authToken");
      dispatch({
        type: TEACHING_INPUT_SUCCESS,
        payload: {
            courses: response.data.courses,
        },
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

/* GET THE COURSE */
export const getCourse = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/uniwave/get-course`,
        { withCredentials: true }
      );
      //console.log(response.data.courses);
      dispatch({
        type: TEACHING_GET_SUCCESS,
        payload: {
            courses: response.data.courses,
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

/* DELETE THE COURSE */
export const deleteCourse = ( courseId ) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/uniwave/delete-course/${courseId}`,
        { withCredentials: true }
      )
      dispatch({
        type: DELETE_COURSE_SUCCESS,
        payload: courseId
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};
