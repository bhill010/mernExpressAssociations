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
  // let newState;
  switch (action.type) {
    case FETCH_USERS:
      var newState = _.merge({}, state, { users: action.payload });
      // console.log("fetch users reducer data", newState);
      return newState;
    case FETCH_USER:
      // var newUsers = state.users;
      // newUsers.push(action.payload);
      var newState = _.merge({}, state, { users: action.payload });
      console.log("fetch user reducer state: ", newState);
      return newState;
    case DELETE_USER:
      // console.log("delete payload: ", action.payload);
      // var newState = _.omit({}, state, action.payload);
      // console.log("deleted state reducer: ", newState);
      // return newState;

      var payload = action.payload;
      var newState = {...state, users: state.users.filter(c => c._id !== payload._id )};
      console.log("deleted state reducer: ", newState);
      return newState;
    case CREATE_USER:
      // var index = null;
      // for (var key in state) {
      //   if (index === null || key > index) {
      //     index = key;
      //   }
      // }
      // index++;
      //
      // newState = _.merge({}, state, { [index]: action.payload });
      var newUsers = state.users;
      newUsers.push(action.payload);
      newState = _.merge({}, state, newState);
      console.log("create user reducer data:", newState);
      return newState;
    case UPDATE_USER:
      newState = _.merge({}, state);
      for (var key in newState) {
        if (newState[key]._id === action.payload._id) {
          newState[key] = action.payload;
        }
      }
      return newState;
    case 'persist/REHYDRATE':
        return { ...state, persistedState: action.payload };
    default:
      return state;
  }
}
