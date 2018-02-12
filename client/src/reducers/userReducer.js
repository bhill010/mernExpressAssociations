import {
  FETCH_USERS,
  FETCH_USER,
  DELETE_USER,
  UPDATE_USER,
  CREATE_USER
} from "../actions/types";

import _ from "lodash";

const defaultState = {
  users: []
};

export default function(state = defaultState, action) {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case FETCH_USERS:
      newState = _.merge({}, state, { users: action.payload });
      return newState;
    case FETCH_USER:
      newState = _.merge({}, state, { users: action.payload });
      return newState;
    case DELETE_USER:
      var payload = action.payload;
      newState = {
        ...state,
        users: state.users.filter(user => user._id !== payload._id)
      };
      return newState;
    case CREATE_USER:
      var newUsers = state.users;
      newUsers.push(action.payload);
      newState = _.merge({}, state, newState);
      return newState;
    case UPDATE_USER:
      newState = _.merge({}, state);
      for (var key in newState) {
        if (newState[key]._id === action.payload._id) {
          newState[key] = action.payload;
        }
      }
      return newState;
    default:
      return state;
  }
}
