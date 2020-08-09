import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
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
    case LOAD_USER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      localStorage.setItem("DevCamper", true);
      return { ...state, isAuth: true, token: payload };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload,
      };
    case USER_REGISTER_FAILURE:
    case USER_LOGIN_FAILURE:
      return { ...state, error: payload, isAuth: false };
    default:
      return state;
  }
};
