import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";
import AppRoutes from "./AppRoutes";
import "./global-css/index.css";
import reducer from "./reducers";
import registerServiceWorker from "./registerServiceWorker";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// need to pass the reducer
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, promiseMiddleware()))
);

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
