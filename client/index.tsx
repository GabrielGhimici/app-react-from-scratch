import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app/app";
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import { rootReducer } from './app/store/root.reducer';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './app/styles/material-ui-theme';
import { BrowserRouter as Router } from 'react-router-dom';

const middlewareEnhancer = applyMiddleware(createLogger());
const store = createStore(rootReducer, middlewareEnhancer);

ReactDOM.render(
  <Provider store={store}>
      <Router>
        <MuiThemeProvider theme={theme}>
          <App/>
        </MuiThemeProvider>
      </Router>
    </Provider>,
    document.getElementById("app")
);
