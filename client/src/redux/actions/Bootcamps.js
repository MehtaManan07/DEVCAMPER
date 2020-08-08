import axios from "axios";
import {
  GET_BOOTCAMPS_REQUEST,
  GET_BOOTCAMPS_SUCCESS,
  GET_BOOTCAMPS_FAILURE,
  CREATE_BOOTCAMP_REQUEST,
  CREATE_BOOTCAMP_SUCCESS,
  CREATE_BOOTCAMP_FAILURE,
  GET_BOOTCAMPS_RAD_REQUEST,
  GET_BOOTCAMPS_RAD_FAILURE,
  GET_BOOTCAMPS_RAD_SUCCESS,
  UPDATE_BOOTCAMP_REQUEST,
  UPDATE_BOOTCAMP_SUCCESS,
  UPDATE_BOOTCAMP_FAILURE,
  REMOVE_BOOTCAMP_REQUEST,
  REMOVE_BOOTCAMP_SUCCESS,
  REMOVE_BOOTCAMP_FAILURE,
  GET_BOOTCAMP_REQUEST,
  GET_BOOTCAMP_SUCCESS,
  GET_BOOTCAMP_FAILURE,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
} from "../types";

export const getBootcamps = (price,career) => async (dispatch) => {
  dispatch({ type: GET_BOOTCAMPS_REQUEST });
  try {
    let url = `/api/v1/bootcamps/`;
    if(career && price){
      url = `/api/v1/bootcamps?careers[in]=${career}&averageCost[lte]=${price}`
    }
    
    if(price && !career){
      url = `/api/v1/bootcamps?averageCost[lte]=${price}`
    }
    
    if(!price && career){
      url = `/api/v1/bootcamps?careers[in]=${career}`
    }

    const bootcamps = await axios.get(url);
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
    dispatch({ type: REMOVE_BOOTCAMP_SUCCESS, payload: id });
  } catch (error) {
    const displayErr = error.response.data.error
    dispatch({ type: REMOVE_BOOTCAMP_FAILURE, payload: displayErr });
  }
};

export const uploadImage = (id,image) => async (dispatch) => {
  dispatch({ type: UPLOAD_IMAGE_REQUEST });
  try {
    const bootcamp = await axios.put(`/api/v1/bootcamps/${id}/photo`,image, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: bootcamp.data.data });
  } catch (error) {
    const displayErr = error.response.data.error;
    dispatch({ type: UPLOAD_IMAGE_FAILURE, payload: displayErr });
  }
};
