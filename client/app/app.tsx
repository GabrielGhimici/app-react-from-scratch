import * as React from "react";
import './app.scss';
import { NavLink, Router } from 'react-router-dom';
import { User } from './store/user/user';
import { connect } from 'react-redux';
import { history } from '../index';
import AppRoutes from './app-routes';
import { AppBar, Menu, MenuItem } from '@material-ui/core';
import { UserActions } from './store/user/user.actions';

interface RootAppProps {
  user: User;
  handleLogout: Function;
}
interface RootAppState {
  anchorEl: any;
}

class App extends React.Component<RootAppProps,RootAppState> {
  constructor(props: RootAppProps) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(event: any) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const userZone = this.props.user !== null ?
      <React.Fragment>
        <div
          className="user-square"
          aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="menu"
          onClick={this.handleClick}
        >
          {this.props.user.firstName[0]}
        </div>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          disableAutoFocusItem={true}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => {this.handleClose(); this.props.handleLogout()}}>Logout</MenuItem>
        </Menu>
      </React.Fragment>
      :
      <NavLink to="/login" activeClassName="selected">Login</NavLink>;
    return (

      <Router history={history}>
        <React.Fragment>
          <AppBar position={'relative'} className="title-bar">
            <h1>Comment Simulator</h1>
            <div className="left-content">
              <NavLink to="/threads" activeClassName="selected">Threads</NavLink>
              {userZone}
            </div>
          </AppBar>
          <AppRoutes/>
        </React.Fragment>
      </Router>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    user: state.userData.user
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    handleLogout: () => {
      dispatch(UserActions.logout());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
