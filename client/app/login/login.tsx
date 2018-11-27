import * as React from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../store/user/user.actions';
import './login.scss'
import { Button, LinearProgress, TextField } from '@material-ui/core';

interface LoginProps {
  authorize: boolean;
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
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({
      [event.target.id]: event.target.value
    } as LoginState)
  };

  handleSubmit(event: any) {
    event.preventDefault();
    this.props.handleLogin(this.state);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  render() {
    const loading = this.props.authorize ?
      <div className="non-in-dom">
        <LinearProgress/>
      </div> : '';
    return (
      <div className="login-container">
        <div className="login-card">
          {loading}
          <div className="with-space">
            <h1>Authentication</h1>
            <form className="form"
                  autoComplete="off"
                  onSubmit={this.handleSubmit}>
              <TextField
                id="username"
                placeholder="Username"
                value={this.state.username}
                margin="normal"
                variant="outlined"
                onChange={this.handleChange}
              />
              <TextField
                id="password"
                placeholder="Password"
                type="password"
                value={this.state.password}
                margin="normal"
                variant="outlined"
                onChange={this.handleChange}
              />
              <div className="button-container">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!this.validateForm()}>
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state: any) {
  return {
    authorize: state.userData.authorize
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    handleLogin: (state: LoginState) => {
      dispatch(UserActions.login(state.username, state.password));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
