import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from "../types";

const initialState = {
  user: {},
  isAuth: null,
  error: {},
  token: "",
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true, isAuth: false };
    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      localStorage.setItem("DevCamper", true);
      return { ...state, isAuth: true, token: payload };
    case USER_REGISTER_FAILURE:
    case USER_LOGIN_FAILURE:
      return { ...state, error: payload, isAuth: false };
    default:
      return state;
  }
};
