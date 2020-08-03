import {
  GET_BOOTCAMPS_REQUEST,
  GET_BOOTCAMPS_SUCCESS,
  GET_BOOTCAMPS_FAILURE,
  GET_BOOTCAMPS_RAD_REQUEST,
  GET_BOOTCAMPS_RAD_SUCCESS,
  GET_BOOTCAMPS_RAD_FAILURE,
} from "../types";

const initialState = {
  bootcamps: [],
  loading: false,
  error: {},
  bootcamp: null,
};

export const getBootcampsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case GET_BOOTCAMPS_REQUEST:
    case GET_BOOTCAMPS_RAD_REQUEST:
      return { ...state, loading: true };
    case GET_BOOTCAMPS_SUCCESS:
    case GET_BOOTCAMPS_RAD_SUCCESS:
      return { ...state, loading: false, bootcamps: payload };
    case GET_BOOTCAMPS_FAILURE:
    case GET_BOOTCAMPS_RAD_FAILURE:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
