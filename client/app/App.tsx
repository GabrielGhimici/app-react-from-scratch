import * as React from "react";
import './App.scss';
import { connect } from 'react-redux';
import { ThreadListActions } from './thread-list/store/thread-list.actions';
import { Thread } from './thread-list/store/thread-list';

interface AppProps {
  threads: Array<Thread>,
  loading: boolean,
  onLoad: Function
}

export class App extends React.Component<AppProps, {}> {
  componentWillMount() {
    this.props.onLoad();
  }
  render() {
    const arr = this.props.threads.map((el: any) => <div key={el.id}>{el.id} -> {el.ceva}</div>)
    return (
      <div>
        <h1 className="try-scss">Hello from Comment simulator playground!</h1>
        {arr}
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    threads: state.threadList.items,
    loading: state.threadList.loading
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onLoad: () => {
      dispatch(ThreadListActions.loadThreads());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
