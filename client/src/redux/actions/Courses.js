import {
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
  REMOVE_COURSE_REQUEST,
  REMOVE_COURSE_SUCCESS,
  REMOVE_COURSE_FAILURE,
} from "../types";
import Axios from "axios";

export const addCourse = (id, data) => async (dispatch) => {
  dispatch({ type: ADD_COURSE_REQUEST });
  try {
    const course = await Axios.post(`/api/v1/bootcamps/${id}/courses`, data, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch({ type: ADD_COURSE_SUCCESS, payload: course.data.data });
  } catch (error) {
    const displayErr = error.response.data.error.split(",");
    dispatch({ type: ADD_COURSE_FAILURE, payload: displayErr });
  }
};

export const removeCourse = (id) => async (dispatch) => {
  dispatch({ type: REMOVE_COURSE_REQUEST });
  try {
    const course = await Axios.delete(`/api/v1/courses/${id}`);
    dispatch({ type: REMOVE_COURSE_SUCCESS, payload: course.data.data });
    
  } catch (error) {
    const displayErr = error.response.data.error;
    dispatch({ type: REMOVE_COURSE_FAILURE, payload: displayErr });
  }
};
