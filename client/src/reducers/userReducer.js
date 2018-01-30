import { FETCH_USERS,
         FETCH_USER,
         DELETE_USER,
         UPDATE_USER,
         CREATE_USER
       } from '../actions/types';

import _ from 'lodash';

const defaultState = {
  users: []
}

export default function(state = defaultState, action) {
  switch(action.type) {
    case FETCH_USERS:
      return _.merge({}, action.payload);
    case FETCH_USER:
      return { ...state, [ action.payload.data._id ]: action.payload.data }
    case DELETE_USER:
      return _.omit(state, action.payload);
    case CREATE_USER:
      let index = null;
      for (var key in state) {
        if (index === null || key > index) {
          index = key;
        }
      }
      index++;
      
      var newState = _.merge({}, state, { [index]: action.payload });
      console.log("create reducer returns:", newState);
      return newState;
      // return _.assign({}, action.payload, ...state);
    default:
      return state;
  }
}
