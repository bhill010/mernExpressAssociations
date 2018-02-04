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
  LOGOUT
} from "./types";

export const fetchUsers = () => {
  return dispatch => {
    axios.get("/users").then(response => {
      let users = response.data;
      dispatch({ type: FETCH_USERS, payload: users });
    });
  };
};

export const fetchUser = id => {
  return dispatch => {
    axios.get(`/users/${id}`).then(response => {
      let user = response.data;

      dispatch({ type: FETCH_USER, payload: user });
    });
  };
};

export const createUser = username => {
  return dispatch => {
    axios.post("/users", { username }).then(response => {
      dispatch({ type: CREATE_USER, payload: response.data });
    });
  };
};

export const deleteUser = id => {
  return dispatch => {
    axios.delete(`/users/${id}`).then(response => {
      dispatch({ type: DELETE_USER, payload: response.data });
    });
  };
};

export const updateUser = (id, username, cb = null) => {
  return dispatch => {
    axios.put(`/users/${id}`, { username }).then(response => {
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
        cb("/api/register");
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
        cb("/api/login");
      });
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
