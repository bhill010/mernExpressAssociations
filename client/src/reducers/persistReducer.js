const defaultState = {
  users: [],
  auth: {
    user: {},
    loggedIn: false,
    errorMessage: ""
  }
}

export default function(state = defaultState, action) {
  Object.freeze(state);
  switch (action.type) {
    case 'persist/REHYDRATE':
      return { ...state, persistedState: action.payload };
    default:
      return state;
  }
}
