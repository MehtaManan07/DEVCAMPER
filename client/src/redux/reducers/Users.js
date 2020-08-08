import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
} from "../types";

const initialState = {
  user: {},
  isAuth: null,
  error:{},
  token: "",
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true, isAuth: false };
    case USER_REGISTER_SUCCESS:
      return { ...state, isAuth: true, token: payload };
    case USER_REGISTER_FAILURE:
      return { ...state, error: payload, isAuth: false };
    default:
      return state;
  }
};
