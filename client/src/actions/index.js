import axios from "axios";
import {
  FETCH_USER,
  FETCH_USERS,
  DELETE_USER,
  CREATE_USER,
  UPDATE_USER } from "./types";

export const fetchUsers = () => {
  console.log("fetch users dispatching");
  return dispatch => {
    axios.get('/users')
      .then((response) => {
        let users = response.data;
        console.log("fetch users response: ", users);

        dispatch({ type: FETCH_USERS, payload: users });
      });
  }
}

export const fetchUser = (id) => {
  console.log("fetch user action");
  return dispatch => {
    axios.get(`/users/${id}`)
      .then((response) => {
        let user = response.data;

        dispatch({ type: FETCH_USER, payload: user });
      });
  }
}

export const createUser = (username) => {
  // console.log("action username", username);
  return dispatch => {
    axios.post('/users', { username })
      .then((response) => {
        // console.log("create user response: ", response);
        dispatch({ type: CREATE_USER, payload: response.data })
      })
  }
}

export const deleteUser = (id) => {
  axios.delete(`/users/${id}`)
    .then((response) => {
      fetchUsers();
    })
}

export const updateUser = (id, username) => {
  axios.put(`/users/${id}`, { username })
    .then((response) => {
      fetchUsers();
    })
    .then(() => {
      this.props.history.push('/')
    })
}
