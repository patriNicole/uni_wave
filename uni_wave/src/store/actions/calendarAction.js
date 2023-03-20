import axios from "axios";
import { CALENDAR_INPUT_SUCCESS } from "../types/calendarType.js";

export const addEvent = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/uniwave/input-calendar",
      data,
      { withCredentials: true }
    );
    //console.log(response.data)
    if (response.data.success) {
      dispatch({
        type: CALENDAR_INPUT_SUCCESS,
        payload: {
          calendarList: response.data.calendarList,
        },
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
};