import axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from "../types";
import store from '../store'
// store.getState().user.token

export const registerUser = (data) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const response = await axios.post(`/api/v1/auth/register`, data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data)
    dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data.data });
  } catch (error) {
    console.log(error.response.data);
    const displayErr = error.response.data.error.split(",");
    dispatch({ type: USER_REGISTER_FAILURE, payload: displayErr });
  }
};

export const loginUser = (data) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const response = await axios.post(`/api/v1/auth/login`, data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data)
    dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data.data });
  } catch (error) {
    console.log(error.response.data);
    const displayErr = error.response.data.error.split(",");
    dispatch({ type: USER_LOGIN_FAILURE, payload: displayErr });
  }
};
