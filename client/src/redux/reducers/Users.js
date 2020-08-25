import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_PASSWORD_REQUEST,
  USER_PASSWORD_SUCCESS,
  USER_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
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
    case USER_UPDATE_REQUEST:
    case USER_PASSWORD_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      localStorage.setItem("DevCamper", true);
      return { ...state, isAuth: true, token: payload, loading: false };

    case USER_UPDATE_SUCCESS:
    case USER_PASSWORD_SUCCESS:
      return { ...state, isAuth: true, token: payload, loading: false };

    case FORGOT_PASSWORD_SUCCESS:
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload,
        error:{}
      };
    case USER_REGISTER_FAILURE:
    case USER_LOGIN_FAILURE:
      return { ...state, error: payload, loading: false, isAuth: false };
    case USER_UPDATE_FAILURE:
    case USER_PASSWORD_FAILURE:
    case FORGOT_PASSWORD_FAILURE:
    case CHANGE_PASSWORD_FAILURE:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};
