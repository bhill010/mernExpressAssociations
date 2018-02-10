import {
  FETCH_CREDENTIAL_USERS
} from "../actions/types";

import _ from "lodash";

const defaultState = {
  ownedUsers: []
};

export default function(state = defaultState, action) {
  Object.freeze(state);
  switch (action.type) {
    case FETCH_CREDENTIAL_USERS:
      let newState = _.merge(defaultState, { ownedUsers: action.payload })
      console.log("credential reducer returned state: ", newState);;
      return newState;
    default:
      return state;
  }
}
