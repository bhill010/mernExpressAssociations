import {
  REGISTER,
  REGISTER_FAILED,
  LOGIN,
  LOGIN_FAILED,
  LOGOUT
} from "../actions/types";

import _ from "lodash";

const defaultState = {
  user: {},
  loggedIn: false,
  errorMessage: ""
};

export default function(state = defaultState, action) {
  Object.freeze(state);
  switch (action.type) {
    case REGISTER:
      return _.merge({}, state, {
        loggedIn: true,
        user: action.payload,
        errorMessage: ""
      });
    case REGISTER_FAILED:
      return _.merge({}, state, {
        loggedIn: false,
        user: {},
        errorMessage: action.payload
      });
    case LOGIN:
      return _.merge({}, state, {
        loggedIn: true,
        user: action.payload,
        errorMessage: ""
      });
    case LOGIN_FAILED:
      return _.merge({}, state, {
        loggedIn: false,
        user: {},
        errorMessage: action.payload
      });
    case LOGOUT:
      return _.merge({}, state, defaultState);
    case 'persist/REHYDRATE':
      return { ...state, persistedState: action.payload };
    default:
      return state;
  }
}
