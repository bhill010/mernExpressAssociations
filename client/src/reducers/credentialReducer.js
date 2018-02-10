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

      let newState = _.merge({}, state, { ownedUsers: action.payload })
      return newState;
    default:
      return state;
  }
}
