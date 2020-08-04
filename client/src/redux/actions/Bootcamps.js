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
  CREATE_BOOTCAMP_FAILURE
} from "../types";

export const getBootcamps = () => async (dispatch) => {
  dispatch({ type: GET_BOOTCAMPS_REQUEST });
  try {
    const bootcamps = await axios.get(`/api/v1/bootcamps`);
    console.log(bootcamps);
    dispatch({ type: GET_BOOTCAMPS_SUCCESS, payload: bootcamps.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: GET_BOOTCAMPS_FAILURE, payload: error });
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
    dispatch({ type: GET_BOOTCAMPS_RAD_FAILURE, payload: error });
  }
};

export const createBootcamp = (data) => async (dispatch) => {
  dispatch({ type: CREATE_BOOTCAMP_REQUEST });
  try {
    const bootcamps = await axios.post(
      `/api/v1/bootcamps`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(bootcamps);
    dispatch({ type: CREATE_BOOTCAMP_SUCCESS, payload: bootcamps.data.data });
  } catch (error) {
    const displayErr = error.response.data.error.split(',')
    dispatch({ type: CREATE_BOOTCAMP_FAILURE, payload: displayErr });
  }
};
