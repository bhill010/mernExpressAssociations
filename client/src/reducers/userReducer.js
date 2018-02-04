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
      return _.merge({}, action.payload);
    case FETCH_USER:
      newState = _.merge({}, action.payload);
      return newState;
    case DELETE_USER:
      return _.omit(state, action.payload);
    case CREATE_USER:
      var index = null;
      for (var key in state) {
        if (index === null || key > index) {
          index = key;
        }
      }
      index++;

      newState = _.merge({}, state, { [index]: action.payload });
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
