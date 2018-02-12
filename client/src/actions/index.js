import axios from "axios";
import {
  FETCH_USER,
  FETCH_USERS,
  DELETE_USER,
  CREATE_USER,
  UPDATE_USER,
  REGISTER,
  REGISTER_FAILED,
  LOGIN,
  LOGIN_FAILED,
  LOGOUT,
  CLEAR_AUTH_ERRORS
} from "./types";

export const fetchUsers = () => {
  return dispatch => {
    axios.get("/api/users").then(response => {
      let users = response.data;
      dispatch({ type: FETCH_USERS, payload: users });
    });
  };
};

export const fetchUser = id => {
  return dispatch => {
    axios.get(`/api/users/${id}`).then(response => {
      let user = response.data;
      dispatch({ type: FETCH_USER, payload: user });
    });
  };
};

export const createUser = (username, id, ownerID) => {
  return dispatch => {
    axios
      .post(`/api/credential/${id}/users`, { username, ownerID })
      .then(response => {
        dispatch({ type: CREATE_USER, payload: response.data });
      });
  };
};

export const deleteUser = (id, credentialID) => {
  return dispatch => {
    axios
      .delete(`/api/credential/${credentialID}/users/${id}`)
      .then(response => {
        dispatch({ type: DELETE_USER, payload: response.data });
      });
  };
};

export const updateUser = (id, credentialID, username, cb = null) => {
  return dispatch => {
    axios
      .put(`/api/credential/${credentialID}/users/${id}`, { username })
      .then(response => {
        dispatch({ type: UPDATE_USER, payload: response.data });
      });
  };
};

export const register = (username, password, cb) => {
  return dispatch => {
    axios
      .post("/api/register", { username, password })
      .then(response => {
        dispatch({ type: REGISTER, payload: response.data });
        cb("/users");
      })
      .catch(err => {
        dispatch({ type: REGISTER_FAILED, payload: err.response.data });
        cb("/register");
      });
  };
};

export const login = (username, password, cb) => {
  return dispatch => {
    axios
      .post("/api/login", { username, password })
      .then(response => {
        dispatch({ type: LOGIN, payload: response.data });
        cb("/users");
      })
      .catch(err => {
        dispatch({ type: LOGIN_FAILED, payload: err.response.data });
        cb("/login");
      });
  };
};

export const clearAuthErrors = () => {
  return dispatch => {
    dispatch({ type: CLEAR_AUTH_ERRORS });
  };
};

export const logout = cb => {
  return dispatch => {
    axios.get("/api/logout").then(response => {
      dispatch({ type: LOGOUT, payload: response.data });
      cb("/users");
    });
  };
};
