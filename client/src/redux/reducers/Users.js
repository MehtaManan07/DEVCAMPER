import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
} from "../types";

const initialState = {
  user: {},
  token: "",
  error:{}
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, token: payload };
    case USER_REGISTER_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
};
