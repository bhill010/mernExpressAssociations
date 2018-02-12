export default function(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case 'persist/REHYDRATE':
      return { ...state, persistedState: action.payload };
    default:
      return state;
  }
}
