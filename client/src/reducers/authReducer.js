import { REGISTER,
         REGISTER_FAILED,
         LOGIN,
         LOGIN_FAILED,
         LOGOUT
       } from '../actions/types';

import _ from 'lodash';

const defaultState = {
  username: "",
  loggedIn: false,
  errorMessage: ""
}

export default function(state = defaultState, action) {
  Object.freeze(state);
  switch(action.type) {
    case REGISTER:
      return _.merge({}, state, { loggedIn: true, username: action.payload })
    case REGISTER_FAILED:
      return _.merge({}, state, { loggedIn: false, errorMessage: action.payload })
    case LOGIN:
      return action.payload || false;
    case LOGIN_FAILED:
    return _.merge({}, state, { loggedIn: false, errorMessage: "login failed" })
    case LOGOUT:
      return action.payload;
    default:
      return state;
  }
}
