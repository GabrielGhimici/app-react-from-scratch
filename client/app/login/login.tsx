import * as React from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../store/user/user.actions';
import "./login.scss"
import { TextField } from '@material-ui/core';

interface LoginProps {
  handleLogin: (state: LoginState) => void;
}

interface LoginState {
  username: string,
  password: string
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  handleChange(event: any) {
    this.setState({
      [event.target.id]: event.target.value
    } as LoginState)
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-card">
          <form className="form" autoComplete="off">
            <TextField
              id="username"
              placeholder="Username"
              value={this.state.username}
              margin="normal"
              variant="outlined"
              onChange={this.handleChange.bind(this)}
            />
            <TextField
              id="password"
              placeholder="Password"
              type="password"
              value={this.state.password}
              margin="normal"
              variant="outlined"
              onChange={this.handleChange.bind(this)}
            />
          </form>
        </div>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch: any) {
  return {
    handleLogin: (state: LoginState) => {
      dispatch(UserActions.login('',''));
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)
