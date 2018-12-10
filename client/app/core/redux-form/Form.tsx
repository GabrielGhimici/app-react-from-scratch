import * as React from 'react';
import { connect } from 'react-redux';

interface FormProps {
  connect: Array<any>,
  state: {[x: string]: any}
}

interface FormState {
  values: {[x: string]: any}
}

class Form extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = {
      values: this.findSubState()
    }
  }

  private findSubState() {
    let subState = this.props.state;
    const connect = this.props.connect;
    for (let i = 0; i < connect.length; i++) {
      console.log(connect[i]);
      console.log(subState);
      if (!connect[i]) {
        throw new Error('Unable to connect to Store[undefined]');
      }
      if (subState instanceof Array && isNaN(Number(connect[i]))) {
        throw new Error("Path element is not an index!")
      } else if (subState instanceof Array && Number(connect[i]) < 0) {
        throw new Error(`Unable to find element at index ${connect[i]}`)
      }
      if (!subState[connect[i]]) {
        throw new Error(`Unable to find ${connect[i-1] ? connect[i-1] : 'rootState'}[${connect[i]}]`)
      } else {
        subState = subState[connect[i]]
      }
    }
    return subState;
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
        ActualState: {JSON.stringify(this.state.values)}
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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
