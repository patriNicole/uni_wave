import axios from "axios";
import { CALENDAR_INPUT_SUCCESS, CALENDAR_GET_SUCCESS } from "../types/calendarType.js";

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

export const getCalendar = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/uniwave/get-calendar",
      { withCredentials: true }
    );
    //console.log(response.data)
    if (response.data.success) {
      dispatch({
        type: CALENDAR_GET_SUCCESS,
        payload: {
          calendarList: response.data.calendarList,
        },
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
};