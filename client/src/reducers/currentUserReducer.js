import { FETCH_USER,
         UPDATE_USER,
       } from '../actions/types';

import _ from 'lodash';

const defaultState = {
  username: "",
  id: ""
}

export default function(state = defaultState, action) {
  switch(action.type) {
    case FETCH_USER:
      return { ...state, [ action.payload.data._id ]: action.payload.data }
    default:
      return state;
  }
}
