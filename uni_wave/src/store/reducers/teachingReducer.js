import { TEACHING_INPUT_SUCCESS, TEACHING_GET_SUCCESS, DELETE_COURSE_SUCCESS, UPDATE_COURSE } from "../types/teachingType.js";

// the friends array in the state object will be updated with
// the new data provided in the payload property
const teachingState = {
  courses: [],
};

export const teachingReducer = (state = teachingState, action) => {
  // the type property is typically used to identify the type of action being performed
  // the payload property is used to provide additional data to the reducer function
  const { type, payload } = action;

  if (type === TEACHING_INPUT_SUCCESS) {
    return {
      ...state,
      // The new message array contains all the elements of the previous message array,
      // as well as the new payload.message object added to the end of the array
      courses: [...state.courses, payload.courses],
    };
  }

  if (type === TEACHING_GET_SUCCESS) {
    return {
      //updating the state of the application with the latest message retrieved from the server
      ...state,
      courses: payload.courses,
    };
  }

  if (type === DELETE_COURSE_SUCCESS) {
    const filteredCourses= state.courses.filter(post => post._id !== action.payload);
    return {
      ...state,
      courses: filteredCourses
    };
  }

  if (type === UPDATE_COURSE) {
    // Find the course index which we want to change
    const updatedCourseIndex = state.courses.findIndex((course) => course._id === payload._id);
    // Get the updated course state
    const updatedCourses = [...state.courses];
    // Equal it with the new state from payload
    updatedCourses[updatedCourseIndex] = payload;
    return {
      ...state,
      courses: updatedCourses,
    };
  }

  return state;
};
