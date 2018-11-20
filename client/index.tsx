import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app/App";
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import { rootReducer } from './app/store/root.reducer';
import { Provider } from 'react-redux';

const middlewareEnhancer = applyMiddleware(createLogger());
const store = createStore(rootReducer, middlewareEnhancer);

ReactDOM.render(
  <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById("app")
);
