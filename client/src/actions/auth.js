import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  DELETE_USER,
  DELETE_ACCOUNT
} from "./types";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:5000/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = (
  username,
  firstname,
  lastname,
  email,
  password,
  usertype
) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({
    username,
    firstname,
    lastname,
    email,
    password,
    usertype
  });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/register",
      body,
      config
    );

    await dispatch(setAlert("User created successfully!", "success"));

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (error) {
    console.log(error.response);
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth",
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const deleteAccount = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.delete("http://localhost:5000/api/delete", {
      headers: {
        "Content-Type": "application/json"
      },
      data: { id }
    });
    dispatch({
      type: DELETE_ACCOUNT
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }
  }
};

export const deleteUser = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.delete("http://localhost:5000/api/delete", {
      headers: {
        "Content-Type": "application/json"
      },
      data: { id }
    });
    dispatch({
      type: DELETE_USER,
      payload: id
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT
  });
};
