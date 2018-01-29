import axios from "axios";
import {
  FETCH_USER,
  FETCH_USERS,
  DELETE_USER,
  CREATE_USER,
  UPDATE_USER } from "./types";

export const fetchUsers = () => {
  axios.get('/users')
    .then((response) => {
      let users = response.data;

      dispatch({ type: FETCH_USERS, payload: users });
    });
  }
}

export const fetchUser = (id) => {
  axios.get(`/users/${id}`)
    .then((response) => {
      let user = response.data;

      dispatch({ type: FETCH_USER, payload: user });
    });
  }
}
