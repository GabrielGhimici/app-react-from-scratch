import * as React from "react";
import './app.scss';
import AppBar from '@material-ui/core/AppBar/AppBar';
import AppRoutes from './app-routes';
import { NavLink } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppBar position={'relative'} className="title-bar">
          <h1>Comment Simulator</h1>
          <div className="left-content">
            <NavLink to="/threads" activeClassName="selected">Threads</NavLink>
            <NavLink to="/login" activeClassName="selected">Login</NavLink>
          </div>
        </AppBar>
        <AppRoutes/>
      </React.Fragment>
    );
  }
}

