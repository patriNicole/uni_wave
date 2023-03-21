import { CALENDAR_INPUT_SUCCESS, CALENDAR_GET_SUCCESS, DELETE_EVENT_SUCCESS, UPDATE_CALENDAR } from "../types/calendarType.js";

const calendarState = {
  calendarList: [],
};

export const calendarReducer = (state = calendarState, action) => {
  // the type property is typically used to identify the type of action being performed
  // the payload property is used to provide additional data to the reducer function
  const { type, payload } = action;

  if (type === CALENDAR_INPUT_SUCCESS) {
    return {
      ...state,
      // The new calendarList array contains all the elements of the previous calendarList array,
      // as well as the new payload.calendarList object added to the end of the array
      calendarList: [...state.calendarList, payload.calendarList],
    };
  }

  if (type === CALENDAR_GET_SUCCESS) {
    return {
      //updating the state of the application with the latest message retrieved from the server
      ...state,
      calendarList: payload.calendarList,
    };
  }

  if(type === DELETE_EVENT_SUCCESS) {
    const filteredEvents= state.calendarList.filter(post => post._id !== action.payload);
    //console.log(filteredTodos)
    return {
      //updating the state of the application with the latest message retrieved from the server
      ...state,
      calendarList: filteredEvents,
    };
  }

  if (type === UPDATE_CALENDAR) {
    // Find the calendar' index which we want to change
    const updatedCalendarIndex = state.calendarList.findIndex((post) => post._id === payload._id);
    // Get the updated calendar' state
    const updatedCalendar = [...state.calendarList];
    // Equal it with the new state from payload
    updatedCalendar[updatedCalendarIndex] = payload;
    return {
      ...state,
      calendarList: updatedCalendar,
    };
  }

  return state;
};
