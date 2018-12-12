import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { findSubState } from './redux-form.reducer';
import { ReduxFormActions } from './redux-form.actions';

interface FormProps {
  connect: Array<any>,
  state: {[key: string]: any}
  handleUpdate: Function;
}

interface FormState {
  isValid: boolean;
  values: {[x: string]: any};
}

class Form extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      isValid: true,
      values: findSubState(this.props.state, this.props.connect)
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
        ActualState: {JSON.stringify(this.state.values)}
        <Button onClick = {() => {this.props.handleUpdate(this.props.connect, {values: {authorize: true, loading: true}})}}>Press ME</Button>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    handleUpdate: (connect: Array<any>, formValue: any) => {
      dispatch(ReduxFormActions.formChange(connect, formValue));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
