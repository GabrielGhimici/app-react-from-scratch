import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import ThreadList from './thread-list/thread-list';
import Login from './login/login'

export default class AppRoutes extends React.Component {
  render() {
    return (
      <div className="content-container">
        <Route exact path="/" render={() => (
          <Redirect to="/threads"/>
        )}/>
        <Route exact path="/threads" component={ThreadList}/>
        <Route exact path="/login" component={Login}/>
      </div>
    );
  }
}
