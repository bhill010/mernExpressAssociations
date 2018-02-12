import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { autoRehydrate, persistStore } from 'redux-persist';
import reduxThunk from "redux-thunk";

import reducers from "./reducers";

let store = compose(
  applyMiddleware(reduxThunk),
  autoRehydrate()
)(createStore)(reducers);

persistStore(store, { whitelist: ['auth']})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
