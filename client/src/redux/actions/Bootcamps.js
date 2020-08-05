import axios from "axios";
import {
  GET_BOOTCAMPS_REQUEST,
  GET_BOOTCAMPS_SUCCESS,
  GET_BOOTCAMPS_FAILURE,
  GET_BOOTCAMPS_RAD_REQUEST,
  GET_BOOTCAMPS_RAD_FAILURE,
  GET_BOOTCAMPS_RAD_SUCCESS,
  CREATE_BOOTCAMP_REQUEST,
  CREATE_BOOTCAMP_SUCCESS,
  CREATE_BOOTCAMP_FAILURE,
  GET_BOOTCAMP_REQUEST,
  GET_BOOTCAMP_SUCCESS,
  GET_BOOTCAMP_FAILURE,
  UPDATE_BOOTCAMP_REQUEST,
  UPDATE_BOOTCAMP_SUCCESS,
  UPDATE_BOOTCAMP_FAILURE,
  REMOVE_BOOTCAMP_REQUEST,
  REMOVE_BOOTCAMP_SUCCESS,
  REMOVE_BOOTCAMP_FAILURE,
} from "../types";

export const getBootcamps = () => async (dispatch) => {
  dispatch({ type: GET_BOOTCAMPS_REQUEST });
  try {
    const bootcamps = await axios.get(`/api/v1/bootcamps`);
    console.log(bootcamps);
    dispatch({ type: GET_BOOTCAMPS_SUCCESS, payload: bootcamps.data.data });
  } catch (error) {
    console.log(error);
    const displayErr = error.response.data.error;
    dispatch({ type: GET_BOOTCAMPS_FAILURE, payload: displayErr });
  }
};

export const getBootcamp = (id) => async (dispatch) => {
  dispatch({ type: GET_BOOTCAMP_REQUEST });
  try {
    const bootcamp = await axios.get(`/api/v1/bootcamps/${id}`);
    console.log(bootcamp);
    dispatch({ type: GET_BOOTCAMP_SUCCESS, payload: bootcamp.data.data });
  } catch (error) {
    console.log(error);
    const displayErr = error.response.data.error;
    dispatch({ type: GET_BOOTCAMP_FAILURE, payload: displayErr });
  }
};

export const getBootcampsInRadius = (zipcode, distance) => async (dispatch) => {
  dispatch({ type: GET_BOOTCAMPS_RAD_REQUEST });
  try {
    const bootcamps = await axios.get(
      `/api/v1/bootcamps/radius/${zipcode}/${distance}`
    );
    console.log(bootcamps);
    dispatch({ type: GET_BOOTCAMPS_RAD_SUCCESS, payload: bootcamps.data.data });
  } catch (error) {
    console.log(error.response.data);
    const displayErr = error.response.data.error;
    dispatch({ type: GET_BOOTCAMPS_RAD_FAILURE, payload: displayErr });
  }
};

export const createBootcamp = (data) => async (dispatch) => {
  dispatch({ type: CREATE_BOOTCAMP_REQUEST });
  try {
    const bootcamps = await axios.post(`/api/v1/bootcamps`, data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(bootcamps);
    dispatch({ type: CREATE_BOOTCAMP_SUCCESS, payload: bootcamps.data.data });
  } catch (error) {
    const displayErr = error.response.data.error.split(",");
    dispatch({ type: CREATE_BOOTCAMP_FAILURE, payload: displayErr });
  }
};

export const updateBootcamp = (data, id) => async (dispatch) => {
  dispatch({ type: UPDATE_BOOTCAMP_REQUEST });
  try {
    const bootcamp = await axios.put(`/api/v1/bootcamps/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(bootcamp);
    dispatch({ type: UPDATE_BOOTCAMP_SUCCESS, payload: bootcamp.data.data });
  } catch (error) {
    const displayErr = error.response.data.error.split(",");
    dispatch({ type: UPDATE_BOOTCAMP_FAILURE, payload: displayErr });
  }
};

export const removeBootcamp = (id) => async (dispatch) => {
  dispatch({ type: REMOVE_BOOTCAMP_REQUEST });
  try {
    const bootcamp = await axios.delete(`/api/v1/bootcamps/${id}`);
    console.log(bootcamp);
    dispatch({ type: REMOVE_BOOTCAMP_SUCCESS, payload: id });
  } catch (error) {
    const displayErr = error.response.data.error.split(",");
    dispatch({ type: REMOVE_BOOTCAMP_FAILURE, payload: displayErr });
  }
};
