import * as React from "react";
import './app.scss';
import AppBar from '@material-ui/core/AppBar/AppBar';
import AppRoutes from './app-routes';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppBar position={'relative'} className="title-bar">
          <h1>Comment Simulator</h1>
          <a>Threads</a>
        </AppBar>
        <AppRoutes/>
      </React.Fragment>
    );
  }
}

