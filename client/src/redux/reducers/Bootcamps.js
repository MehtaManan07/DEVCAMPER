import {
  GET_BOOTCAMPS_REQUEST,
  GET_BOOTCAMPS_SUCCESS,
  GET_BOOTCAMPS_FAILURE,
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
      return { ...state, loading: true };
    case GET_BOOTCAMPS_SUCCESS:
      return { ...state, loading: false, bootcamps: payload };
    case GET_BOOTCAMPS_FAILURE:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
