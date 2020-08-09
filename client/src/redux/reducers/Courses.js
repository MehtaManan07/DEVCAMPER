import {
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
  REMOVE_COURSE_REQUEST,
  REMOVE_COURSE_SUCCESS,
  REMOVE_COURSE_FAILURE,
  GET_COURSE_REQUEST,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  GET_COURSE_SUCCESS,
  UPDATE_COURSE_FAILURE,
  GET_COURSE_FAILURE,
} from "../types";

const initialState = {
  loading: false,
  error: {},
  course: null,
};

export const courseReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_COURSE_REQUEST:
    case REMOVE_COURSE_REQUEST:
    case GET_COURSE_REQUEST:
    case UPDATE_COURSE_REQUEST:
      return { ...state, loading: true };
    case ADD_COURSE_SUCCESS:
    case REMOVE_COURSE_SUCCESS:
    case UPDATE_COURSE_SUCCESS:
    case GET_COURSE_SUCCESS:
      return { ...state, loading: false, course: payload };
    case ADD_COURSE_FAILURE:
    case REMOVE_COURSE_FAILURE:
    case UPDATE_COURSE_FAILURE:
    case GET_COURSE_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};
