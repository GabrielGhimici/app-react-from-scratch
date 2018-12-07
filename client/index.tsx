import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app/app";
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import { rootReducer } from './app/store/root.reducer';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './app/styles/material-ui-theme';
import { createBrowserHistory } from 'history';
import { createEpicMiddleware } from 'redux-observable';
import { RootEpics } from './app/store/root.epics';
import UserNotification from './app/core/user-notification/user-notification';

const epicMiddleware = createEpicMiddleware();
const middlewareEnhancer = applyMiddleware(createLogger(), epicMiddleware);
const store = createStore(rootReducer, middlewareEnhancer);
RootEpics.createEpics().forEach((epic) => {
  epicMiddleware.run(epic);
});

export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App/>
      <UserNotification/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("app")
);
