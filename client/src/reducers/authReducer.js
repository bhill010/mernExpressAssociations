import { REGISTER,
         LOGIN,
         LOGOUT
       } from '../actions/types';

import _ from 'lodash';

const defaultState = {
  username: ""
}

export default function(state = defaultState, action) {
  Object.freeze(state);
  switch(action.type) {
    case REGISTER:
      return action.payload || false;
    case LOGIN:
      return action.payload || false;
    case LOGOUT:
      return action.payload;
    default:
      return state;
  }
}
