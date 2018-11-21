import * as React from 'react';
import { Thread } from './store/thread-list';
import { ThreadListActions } from './store/thread-list.actions';
import { connect } from 'react-redux';

interface ThreadListProps {
  threads?: Array<Thread>,
  loading?: boolean,
  onLoad?: Function
}

class ThreadList extends React.Component<ThreadListProps, {}>{
  componentWillMount() {
    this.props.onLoad && this.props.onLoad();
  }
  render() {
    let arr: any = [];
    arr = this.props.threads && this.props.threads.map((el: any) => <div key={el.id}>{el.id} -> {el.ceva}</div>);
    return (
      <React.Fragment>
        {arr}
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ThreadList);
