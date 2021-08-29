import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// let x = something1 => something2 => something3 is almost same as the following.
// The only difference is, arrows have lexical binding of "this," i.e. binding in compile time.

// let x = function (something1) {
//   return function (something2) {
//     return something3;
//   };
// };

// Register user
export const registerUser = (userData, history) => async (dispatch) => {
  try {
    await axios.post("/api/users/register", userData);
    // redirect to login on successful register
    history.push("/login");
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.reponse.data });
  }
};

// Login - get user token
export const loginUser = (userData) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/login", userData);
    const { token } = res.data;
    localStorage.setItem("jwt_token", token);
    // Set token to auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

// Set logged-in user
export const setCurrentUser = (decoded) => {
  return { type: SET_CURRENT_USER, payload: decoded };
};

// User loading
export const setUserLoading = () => {
  return { type: USER_LOADING };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object, which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
