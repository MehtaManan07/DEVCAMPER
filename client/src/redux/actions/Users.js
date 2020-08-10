import axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  LOAD_USER_FAILURE,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_PASSWORD_REQUEST,
  USER_PASSWORD_SUCCESS,
  USER_PASSWORD_FAILURE,
} from "../types";
import store from '../store'
// store.getState().user.token

export const fetchUser = () => async dispatch => {
  dispatch({ type: LOAD_USER_REQUEST })
  try {
    const response = await axios.get(`/api/v1/auth/getMe`)
    dispatch({ type: LOAD_USER_SUCCESS, payload: response.data.data })
  } catch (error) {
    console.log(error.response.data);
    const displayErr = error.response.data.error
    dispatch({ type: LOAD_USER_FAILURE, payload: displayErr });
    
  }
}

export const registerUser = (data) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const response = await axios.post(`/api/v1/auth/register`, data, {
      headers: { "Content-Type": "application/json" },
    });
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
    dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data.data });
    dispatch(fetchUser())
  } catch (error) {
    console.log(error.response.data);
    const displayErr = error.response.data.error.split(",");
    dispatch({ type: USER_LOGIN_FAILURE, payload: displayErr });
  }
};

export const updateDetails = (data) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_REQUEST });
  try {
    const response = await axios.put(`/api/v1/auth/update/details`, data, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: response.data.data });
  } catch (error) {
    console.log(error.response.data);
    const displayErr = error.response.data.error.split(",");
    dispatch({ type: USER_UPDATE_FAILURE, payload: displayErr });
  }
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch({ type: USER_PASSWORD_REQUEST });
  try {
    const response = await axios.put(`/api/v1/auth/update/password`, data, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch({ type: USER_PASSWORD_SUCCESS, payload: response.data.data });
  } catch (error) {
    console.log(error.response.data);
    const displayErr = error.response.data.error;
    dispatch({ type: USER_PASSWORD_FAILURE, payload: displayErr });
  }
};
