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
  CLEAR_LOGIN_ERRORS,
  FETCH_CREDENTIAL_USERS
} from "./types";

export const fetchUsers = () => {
  return dispatch => {
    axios.get("/api/users").then(response => {
      let users = response.data;
      console.log("fetchusers action data: ", users);
      dispatch({ type: FETCH_USERS, payload: users });
    });
  };
};

export const fetchUser = id => {
  return dispatch => {
    axios.get(`/api/users/${id}`).then(response => {
      let user = response.data;
      console.log("fetch user action data: ", user);
      dispatch({ type: FETCH_USER, payload: user });
    });
  };
};

export const createUser = (username, id) => {
  // console.log("data passed to action creator...");
  // console.log("username: ", username);
  // console.log("id: ", id);
  return dispatch => {
    axios.post(`/api/credential/${id}/users`, { username }).then(response => {
      console.log("create user action data: ", response.data);
      dispatch({ type: CREATE_USER, payload: response.data });
    });
  };
};

export const deleteUser = (id, credentialID) => {
  return dispatch => {
    axios.delete(`/api/credential/${credentialID}/users/${id}`).then(response => {
      // console.log("deleteusers action data: ", response.data);
      dispatch({ type: DELETE_USER, payload: response.data });
    });
  };
};

export const updateUser = (id, credentialID, username, cb = null) => {
  return dispatch => {
    axios.put(`/api/credential/${credentialID}/users/${id}`, { username }).then(response => {
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
        cb("/users");
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
        cb("/users");
      });
  };
};

export const clearLoginErrors = () => {
  return dispatch => {
    dispatch({ type: CLEAR_LOGIN_ERRORS });
  }
}

export const logout = cb => {
  return dispatch => {
    axios.get("/api/logout").then(response => {
      dispatch({ type: LOGOUT, payload: response.data });
      cb("/users");
    });
  };
};

// CREDENTIALS
export const fetchCredentialUsers = id => {
  return dispatch => {
    axios.get(`/api/credential/${id}`).then(response => {
      // console.log("credential response data: ", response.data);
      let ownedUsers = response.data;

      dispatch({ type: FETCH_CREDENTIAL_USERS, payload: ownedUsers });
    });
  };
};
