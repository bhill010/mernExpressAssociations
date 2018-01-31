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
  Object.freeze(state);
  let newState;
  switch(action.type) {
    case FETCH_USERS:
      return _.merge({}, action.payload);
    case FETCH_USER:
      // console.log("fetch user reducer:", action.payload);
      newState = _.merge({}, action.payload);
      // console.log("fetch user returned state:", newState);
      return newState
      // return { ...state, [ action.payload._id ]: action.payload }
    case DELETE_USER:
      return _.omit(state, action.payload);
      // newState = _.merge({}, state);
      // delete newState[action.payload._id];
      // return newState;
    case CREATE_USER:
      var index = null;
      for (var key in state) {
        if (index === null || key > index) {
          index = key;
        }
      }
      index++;

      newState = _.merge({}, state, { [index]: action.payload });
      // console.log("create reducer returns:", newState);
      return newState;
      // return _.assign({}, action.payload, ...state);
    case UPDATE_USER:
      newState = _.merge({}, state);
      for (var key in newState) {
        if(newState[key]._id === action.payload._id) {
          newState[key] = action.payload;
        }
      }
      // newState[action.payload._id] = action.payload;
      console.log("update state:", newState);
      return newState;
    default:
      return state;
  }
}
