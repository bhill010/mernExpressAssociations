import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { autoRehydrate, persistStore } from 'redux-persist';
import reduxThunk from "redux-thunk";
// import { loadState, saveState } from './localStorage';

//
// import registerServiceWorker from './registerServiceWorker';

import reducers from "./reducers";

// const persistedState = loadState();

// const store = createStore(
//   reducers,
//   {},
//   applyMiddleware(reduxThunk)
// );

let store = compose(
  applyMiddleware(reduxThunk),
  autoRehydrate()
)(createStore)(reducers);

persistStore(store, { whitelist: ['auth']})

// store.subscribe(() => {
//   saveState(store.getState());
// });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
