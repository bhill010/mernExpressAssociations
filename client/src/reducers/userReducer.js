import { FETCH_USERS,
         FETCH_USER,
         DELETE_USER,
         UPDATE_USER,
         CREATE_USER
       } from '../actions/types';

import _ from 'lodash';

const defaultState = {
  username: "",
  id: ""
}

export default function(state = defaultState, action) {
  switch(action.type) {
    case FETCH_USERS:
      return _.merge({}, action.payload);
    case FETCH_USER:
      return { ...state, [ action.payload.data._id ]: action.payload.data }
    case DELETE_USER:
      return _.omit(state, action.payload)
    default:
      return state;
  }
}
